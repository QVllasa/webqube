import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = new BehaviorSubject<IUser>(null);

  constructor(
    private auth: AngularFireAuth,) {
    this.auth.user.subscribe((user) => {
      this.user$.next(user);
    })
  }
}
