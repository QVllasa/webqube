import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import firebase from "firebase/compat";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = new BehaviorSubject<IUser>(null);

  constructor(
    private auth: AngularFireAuth, private fns: AngularFireFunctions) {
    this.auth.user.subscribe((user) => {
      this.user$.next(user);
    })
  }

  getEmailVerificationLink(user: firebase.User) {
    const getEmailVerificationLink = this.fns.httpsCallable('getEmailVerificationLink');
    return getEmailVerificationLink(user)
  }
}
