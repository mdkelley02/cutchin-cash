import { credentials } from "@grpc/grpc-js";

const CERT_CHAIN_CONTENTS = `-----BEGIN CERTIFICATE-----
MIIDezCCAmOgAwIBAgIJAOfudFM1T5iFMA0GCSqGSIb3DQEBCwUAMHAxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTEOMAwGA1UEBwwFQm9pc2UxHjAcBgNVBAoMFU1h
dHRoZXcgYW5kIERyZXcgSW5jLjEQMA4GA1UECwwHTXkgVW5pdDESMBAGA1UEAwwJ
bG9jYWxob3N0MB4XDTIzMDMyNTAxMDMyOVoXDTI4MDMyMzAxMDMyOVowcDELMAkG
A1UEBhMCVVMxCzAJBgNVBAgMAkNBMQ4wDAYDVQQHDAVCb2lzZTEeMBwGA1UECgwV
TWF0dGhldyBhbmQgRHJldyBJbmMuMRAwDgYDVQQLDAdNeSBVbml0MRIwEAYDVQQD
DAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDSIJtQ
ZILCf1d5/cdvvNqaSnAKGpnmZwW8cIWkm9lNnPHO3iyf5CTrxGbMWG2md9lC2HrJ
uKHptyyOg5oNOTrp2KLRCwhpqD55V19EDhpn5kAF/9vDoFfN6c1bgdDa4v6i8cEd
dHD4ZdyPaND2qWUb4Z79qKZTTOc7b72xsKxS1v86Qr1oyxJseYPkqVAyC/e7WM0j
LX8VePjBPNqViz7gibGkMwbudQ3RZpZQ3hu4y87aIgOZMtCqYbZzHh06EYgFlV1l
V/AGI8VzKzAUP0XA22acD7b3mWZ5OVKdNj63suiqFocppiVbpCSETpCCJa1TaPVo
G27y5TgBQpjazaGNAgMBAAGjGDAWMBQGA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkq
hkiG9w0BAQsFAAOCAQEAf6Lo9TcmVwhdv+nGMP2CY+xVZGBePz2st1T5AE1wykQX
cqtQmGXlWt1hXIsvZFb4regwZuF8812WUEqJJTnNmFXb4+BQ41laeqb/S/r77kFO
wtEnvegaEL1hmLCuL0kx/kaq0/dWmnN2STMLhvAKGMqSU+2fu5jWNJdTJ6i6QssN
oHEBb06y5k76u9jQYs6B9bkazV1wlbx0ZQtqrfr6Y7TZVxO7ntj/H9C1NXoYXQ8u
bEH4Ylbt1CgbhZeJeyKUTGdsPXDvI6ggWL50nLfFG+LiX8WVRoFk9NeJ5Jc0I9KJ
+3KJIjhfSDchljHnx4PiyZh38Tqy3PP9reLv1UYaZA==
-----END CERTIFICATE-----
`;

export const GrpcOptions = {
  address: "localhost:50051",
  credentials: credentials.createSsl(
    null,
    null,
    Buffer.from(CERT_CHAIN_CONTENTS)
  ),
  options: {
    "grpc.keepalive_time_ms": 120000,
    "grpc.http2.min_time_between_pings_ms": 120000,
    "grpc.keepalive_timeout_ms": 20000,
    "grpc.http2.max_pings_without_data": 0,
    "grpc.keepalive_permit_without_calls": 1,
  },
} as const;