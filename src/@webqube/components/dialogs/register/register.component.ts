import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {doc, getDoc} from "firebase/firestore";
import {IClient} from "../../../models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {Router} from "@angular/router";
import {MailService} from "../../../services/mail.service";
import {UserService} from "../../../services/user.service";
import {first, take} from "rxjs/operators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  clientCollection: AngularFirestoreCollection<IClient>;
  emailExists: boolean;
  isLoading: boolean = false;
  isSuccess: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl({value: '', disabled: this.isLoading}, [Validators.required]),
    email: new FormControl({value: '', disabled: this.isLoading}, [Validators.required, Validators.email]),
    password: new FormControl({value: '', disabled: this.isLoading}, [Validators.required, Validators.minLength(8)])
  });

  clientObj: IClient;


  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public auth: AngularFireAuth,
    private fns: AngularFireFunctions,
    private mailService: MailService,
    private userService: UserService,
    private router: Router,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.clientCollection = this.afs.collection<IClient>('clients');
    this.registerForm.valueChanges.subscribe((data) => {
      this.clientObj = data
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend() {
    this.isLoading = true;
    this.emailExists = false;


    if (!this.registerForm.valid) {
      console.log("not valid")
      this.isLoading = false;
      return;
    }


    this.auth.createUserWithEmailAndPassword(this.clientObj.email, this.clientObj.password)
      .then((res) => {
        console.log(res);
        this.isLoading = false
        this.isSuccess = true;
        return res.user?.updateProfile({displayName: this.clientObj.name});
      })
      .then(() => {
        return this.auth.signInWithEmailAndPassword(this.clientObj.email, this.clientObj.password)
      })
      .then(() => {
        return this.auth.currentUser
      })
      .then((user) => {
        console.log("before getemailverificationlink")
        return this.userService.getEmailVerificationLink(user).pipe(first()).toPromise()
      })
      .then((email) => {
        return this.mailService.notifyNewUser(email)
      })
      .then((res) => {
        console.log("next getemailverificationlink")
        this.router.navigate(['/dashboard'])
      })
      .catch((err: FirebaseError) => {
        this.emailExists = err.code === 'auth/email-already-in-use'
        this.isLoading = false
        this.isSuccess = false;
        return;
      })

  }

  get f() {
    return this.registerForm.controls;
  }

}
