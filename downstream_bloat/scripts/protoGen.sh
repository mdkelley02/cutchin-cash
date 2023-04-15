mkdir -p models/proto

OUT_DIR="models/proto"

echo "Compiling protobuf definitions"
FILES=$(pwd)/scripts/*.proto
PROTO_PATH=$(pwd)/scripts
npx protoc \
    --ts_out $OUT_DIR \
    --proto_path $PROTO_PATH \
    $FILES