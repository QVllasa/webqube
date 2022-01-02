import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IClient, IUser} from "../../../models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading: boolean = false;

  signInForm = new FormGroup({
    email: new FormControl({value: '', disabled: this.isLoading}, [Validators.required, Validators.email]),
    password: new FormControl({value: '', disabled: this.isLoading}, [Validators.required, Validators.minLength(8)])
  });

  userObj: IUser;

  constructor(private auth: AngularFireAuth, public dialogRef: MatDialogRef<AuthComponent>) { }

  ngOnInit(): void {
    this.signInForm.valueChanges.subscribe((data) => {
      this.userObj = data
    })
  }

  onSend(){
    this.isLoading = true;

    if (!this.signInForm.valid) {
      console.log("not valid")
      this.isLoading = false;
      return;
    }

    if (!this.userObj.email){
      return;
    }
    this.auth.signInWithEmailAndPassword(this.userObj.email, this.signInForm.get('password')?.value)
      .then((res)=>{
        console.log(res)
        this.isLoading = false;
        this.dialogRef.close()
      });
  }

  get f() {
    return this.signInForm.controls;
  }

}
