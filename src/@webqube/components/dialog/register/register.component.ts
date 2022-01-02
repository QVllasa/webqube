import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {doc, getDoc} from "firebase/firestore";
import {IClient} from "../../../models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {Router} from "@angular/router";


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
      .then(()=>{
        this.auth.signInWithEmailAndPassword(this.clientObj.email, this.clientObj.password).then((res)=>{
          console.log(res)
          this.router.navigate(['/dashboard'])
        })
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
