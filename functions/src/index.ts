import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";
import * as admin from "firebase-admin";
import {clientRegisterTemplate, clientTemplate} from "../components/email-templates";

require('dotenv').config()
const {Client, LogLevel} = require("@notionhq/client")

admin.initializeApp();


export interface IClient {
  name: string,
  email: string,
  business: string,
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const hello = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


export const sendEmail = functions.firestore.document("/clients/{id}").onCreate((snapshot, context) => {

  console.log(snapshot.data())
  const data: IClient = <IClient>snapshot.data();


// Initializing a client
  const notion = new Client({
    auth: '',
    logLevel: LogLevel.DEBUG,
  })
  let response: any;
  (async () => {
    response = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: "4687eba46a5243ffa00ebcc46a0e035c"
      },
      icon: {
        "type": "emoji",
        "emoji": "🚀"
      },
      title: [
        {
          "type": "text",
          "text": {
            "content": data.business,
            "link": null
          }
        }
      ],
      properties: {
        Name: {
          title: {}
        },
        Description: {
          rich_text: {}
        }
      }
    });
    return response

  })().then(res => {
    if (!res) {
      return
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : '')
    const customerMessage = {
      to: `${data.email}`,
      from: 'hello@webqube.de', // Change to your verified sender
      subject: `Bald geht es los mit ${data.business}! 🚀`,
      html: clientTemplate(data, response),
    }

    const internalMessage = {
      to: 'hello@webqube.de',
      from: 'admin@webqube.de', // Change to your verified sender
      subject: `Neue Anmeldung von ${data.name}! 🚀`,
      html: clientRegisterTemplate(data, response),
    }
    sgMail
      .send(customerMessage)
      .then(() => {
        sgMail
          .send(internalMessage)
          .then(() => {
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })



  });
});
