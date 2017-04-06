const {private_key_id, private_key, client_id, shared_secret} = process.env;

const firebaseConfig = {
  "type": "service_account",
  "project_id": "reactcourse-83808",
  "private_key_id": private_key_id,
  "private_key": private_key.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-63dcm@reactcourse-83808.iam.gserviceaccount.com",
  "client_id": client_id,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-63dcm%40reactcourse-83808.iam.gserviceaccount.com"
};
module.exports = {firebaseConfig,shared_secret};