import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IMail} from "../models/mail";
import {IProject, IUser} from "../models/models";
import {projectTemplate} from "../components/mail-templates/project-created";
import { notifyOnNewUserTemplate, welcomeTemplate} from "../components/mail-templates/account-created";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private afs: AngularFirestore) {}

  onCreateAccount(user: IUser, emailVerificationLink: string){
    const mail: IMail = {
      to: [user.email],
      message: {
        text: '',
        subject: 'Willkommen bei Webqube! 🥳',
        html: welcomeTemplate(emailVerificationLink)
      }
    }
    return this.afs.collection<IMail>('mail').add(mail)
  }

  notifyNewUser(user: IUser){
    const mail: IMail = {
      to: ['admin@webqube.de'],
      message: {
        text: '',
        subject: 'Neuer Nutzer angemeldet! 🥳',
        html: notifyOnNewUserTemplate(user)
      }
    }
    return this.afs.collection<IMail>('mail').add(mail)
  }
}
