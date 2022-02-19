import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import firebase from "firebase/compat";


require('dotenv').config()

const fb = admin.initializeApp();

export const getEmailVerificationLink = functions.https.onCall(async (data: firebase.User, context) => {
  const email = data.email;
  return await fb.auth().generateEmailVerificationLink(<string>email);
})

