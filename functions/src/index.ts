import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


const fb = admin.initializeApp();

export const getEmailVerificationLink = functions.https.onCall((data: string, context) => {
  return fb.auth().generateEmailVerificationLink(data);
})

