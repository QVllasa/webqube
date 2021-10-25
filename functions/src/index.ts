import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";
import * as admin from "firebase-admin";
import {clientRegisterTemplate, clientTemplate} from "../components/email-templates";

require('dotenv').config()
const {Client, LogLevel} = require("@notionhq/client")

admin.initializeApp();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : '')

const notion = new Client({
  auth: process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY : '',
  logLevel: LogLevel.DEBUG,
})



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

    const internalMessage = {
      to: `admin@webqube.de`,
      from: 'hello@webqube.de', // Change to your verified sender
      subject: `Neue Anmeldung von ${data.name}! 🚀`,
      html: clientRegisterTemplate(data, response),
    }

    return sgMail
      .send(internalMessage)
      .then(() => {
        console.log("internal message sent")
      })
      .catch((error) => {
        console.error(error)
      })


  }).then(()=>{

    const customerMessage = {
      to: `${data.email}`,
      from: 'hello@webqube.de', // Change to your verified sender
      subject: `Bald geht es los mit ${data.business}! 🚀`,
      html: clientTemplate(data, response),
    }

    return sgMail
      .send(customerMessage)
      .then(() => {
        console.log("customer message sent")
      })
      .catch((error) => {
        console.error(error)
      })


  });
});
