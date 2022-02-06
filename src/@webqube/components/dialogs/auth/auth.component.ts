import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatDialogRef} from "@angular/material/dialog";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private _snackBar: MatSnackBar,
              private auth: AngularFireAuth,
              public dialogRef: MatDialogRef<AuthComponent>) {
  }

  ngOnInit(): void {
    this.signInForm.valueChanges.subscribe((data) => {
      this.userObj = data
    })
  }

  onSend() {
    this.isLoading = true;

    if (!this.signInForm.valid) {
      console.log("not valid")
      this.isLoading = false;
      return;
    }

    if (!this.userObj.email) {
      return;
    }
    this.auth.signInWithEmailAndPassword(this.userObj.email, this.signInForm.get('password')?.value)
      .then((res) => {
        console.log(res)
        this.isLoading = false;
        this._snackBar.open('Willkommen zurück! 🙋‍♂️.', '',
          {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: ['bg-blue-500','text-white']});
        this.dialogRef.close()
      })
      .catch((err: FirebaseError) => {

        switch (err.code) {
          case 'auth/user-not-found': {
            this._snackBar.open('Nutzer nicht gefunden.', '',
              {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['bg-red-700', 'text-white']});
            break;
          }
          case 'auth/wrong-password': {
            this._snackBar.open('Passwort falsch.', '',
              {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['bg-red-700','text-white']});
            break;
          }
        }
        this.isLoading = false
        return;
      })
  }

  get f() {
    return this.signInForm.controls;
  }

}
