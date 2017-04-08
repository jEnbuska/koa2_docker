const admin = require('firebase-admin');
const {firebaseConfig, shared_secret} = require('../config');
const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://reactcourse-83808.firebaseio.com"
});

const getToken = async (ctx) => {
  try{
    app.database().ref().push('hello');
    console.log(app.database().ref().toString());
    app.auth().createCustomToken(shared_secret)
      .then(function(customToken) {
        ctx.body = customToken;
        ctx.status = 200;
      })
      .catch(function(error) {
        ctx.status = 500;
        ctx.body = error;
      });
  }catch(e){
    ctx.status = 500;
    console.error(e.message);
  }
};

module.exports = {getToken};
