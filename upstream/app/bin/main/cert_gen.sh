OUT_PATH=certs/
PRIV_KEY=$OUT_PATH"private.pem"
CERT_CHAIN=$OUT_PATH"certificate.crt"


openssl genrsa -out $PRIV_KEY
openssl pkcs8 -topk8 -nocrypt -in $PRIV_KEY -out $PRIV_KEY.pkcs8
openssl req -new -x509 -key $PRIV_KEY -out $CERT_CHAIN -days 1825 \
-addext "subjectAltName = DNS:localhost" \
-subj "/C=US/ST=CA/L=Boise/O=Matthew and Drew Inc./OU=My Unit/CN=localhost"

