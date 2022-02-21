import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


const fb = admin.initializeApp();

export const getEmailVerificationLink = functions.https.onCall((data: string, context) => {
  console.log("inside function: ", data)
  const email: string = data;
  console.log("email: ", email)
  return fb.auth().generateEmailVerificationLink(email);
})

