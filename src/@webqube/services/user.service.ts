import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../models";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor() { }
}
