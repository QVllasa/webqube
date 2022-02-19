import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IMail} from "../models/mail";
import {IProject, IUser} from "../models/models";
import {projectTemplate} from "../components/mail-templates/project-created";
import {welcomeTemplate} from "../components/mail-templates/account-created";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private afs: AngularFirestore) {}

  onCreateAccount(user: IUser, project: IProject){
    const mail: IMail = {
      to: [user.email],
      message: {
        text: '',
        subject: 'Starte mit deinem ersten Projekt! 🥳',
        html: welcomeTemplate()
      }
    }
    return this.afs.collection<IMail>('mail').add(mail)
  }
}
