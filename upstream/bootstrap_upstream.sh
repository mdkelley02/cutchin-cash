# Make sure docker is installed
which docker > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Docker is not installed. Please install docker first."
    exit 1
fi

NETWORK='cutchin-cash'
REDIS_VOLUME='cutchin-cash-redis'
REDIS_NAME='redis-server'
REDIS_NETWORK_ALIAS='redis'
SERVER_NAME='cutchin-cash-server'
SERVER_PORT='50051'

# Build server image if it doesn't exist
docker images | grep $SERVER_NAME > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Building server image..."
    upstream/./gradlew clean build -x test
    docker build . -t $SERVER_NAME -f app/Dockerfile
fi

# pull redis image if it doesn't exist
docker images | grep redis > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Pulling redis image..."
    docker pull redis:latest
fi

# Create network if it doesn't exist
docker network ls | grep $NETWORK > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Creating network..."
    docker network create $NETWORK
fi

# Create redis volume if it doesn't exist
docker volume ls | grep $REDIS_VOLUME > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Creating redis volume..."
    docker volume create $REDIS_VOLUME
fi

# Stop redis server and remove container if it's running
docker ps | grep $REDIS_NAME > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Stopping redis server..."
    docker stop $REDIS_NAME
    docker rm $REDIS_NAME
fi

# Stop server and remove container if it's running
docker ps | grep $SERVER_NAME > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Stopping server..."
    docker stop $SERVER_NAME
    docker rm $SERVER_NAME
fi

# Start redis server
echo "Starting redis server..."
docker run -d \
    --name $REDIS_NAME \
    --network $NETWORK \
    --network-alias $REDIS_NETWORK_ALIAS \
    -v $REDIS_VOLUME:/data \
    -d redis:latest

# Start server
echo "Starting server..."
docker run -d \
    --name $SERVER_NAME \
    --network $NETWORK \
    -p $SERVER_PORT:$SERVER_PORT \
    -id $SERVER_NAME