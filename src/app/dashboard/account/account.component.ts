import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {IUser} from "../../../@webqube/models";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: IUser|null;
  isLoading:  boolean = false;
  isSuccess: boolean = false;

  isEditMode:string|null = null;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user=> {
      this.user = user;
    })
  }

  onResetPassword() {
    this.isLoading = true;
    if (!this.user?.email){
      return;
    }
    this.auth.sendPasswordResetEmail(this.user.email).then(()=>{
      this.isLoading = false;
      this.isSuccess = true;
    })
  }

  toggleEdit(name: string) {
    if (this.isEditMode === name){
      this.isEditMode = null;
      return;
    } else if ((this.isEditMode !== null) && (this.isEditMode !== name)){
      return;
    }

    console.log(name);
    this.isEditMode = name;
  }
}
