import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";
import * as admin from "firebase-admin";
import {IProject} from "../../src/@webqube/models/models";
import {clientRegisterTemplate} from "../components/email-templates";


require('dotenv').config()

admin.initializeApp();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : '')


export const sendEmail = functions.firestore.document("/projects/{id}").onCreate((snapshot, context) => {

  console.log("console log", snapshot.data())
  const data: IProject = <IProject>snapshot.data();

  const internalMessage = {
    to: 'qendrim.vllasa@gmail.com',
    from: 'admin@webqube.de',
    subject: `Neues Projekt angelegt ${data.title}! 🚀`,
    html: clientRegisterTemplate(data)
  }

  sgMail.send(internalMessage).then().catch((error) => {
    console.error(error)
  })
})


