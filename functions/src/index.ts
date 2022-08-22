import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


const fb = admin.initializeApp();

export const getEmailVerificationLink = functions.https.onCall((data: string, context) => {
  return fb.auth().generateEmailVerificationLink(data);
})


//TODO deploy new stack in portainer after project created
export const createApp;

//TODO create repo
export const createRepo;

