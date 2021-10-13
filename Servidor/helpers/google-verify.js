const { OAuth2Client } = require('google-auth-library');
require("dotenv").config({ path: "variables.env" });
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const googleVerify = async( idToken = '' ) => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });

  const {email,picture,given_name,family_name} = ticket.getPayload();
    
  return {email,picture,given_name,family_name };

}


module.exports = {
    googleVerify
}