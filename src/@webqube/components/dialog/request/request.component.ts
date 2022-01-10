import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {doc, getDoc} from "firebase/firestore";
import {IClient, ITier} from "../../../models/models";


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() priceCard: ITier = this.data;

  clientCollection: AngularFirestoreCollection<IClient>;
  emailExists: boolean;
  isLoading: boolean = false;
  isSuccess: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl({value: '', disabled: this.isLoading}, [Validators.required]),
    email: new FormControl({value: '', disabled: this.isLoading}, [Validators.required, Validators.email]),
    business: new FormControl({value: '', disabled: this.isLoading}),
  });

  clientObj: IClient;


  constructor(
    public dialogRef: MatDialogRef<RequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITier,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    console.log(this.data)
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
    if (!this.registerForm.valid) {
      console.log("not valid")
      return;
    }
    console.log(this.clientObj)
    this.clientCollection.ref.where('email', '==', this.clientObj.email).get()
      .then((snapShot) => {
        console.log(snapShot)
        this.emailExists = !snapShot.empty;
        console.log(this.emailExists, "if email exists")
        if (!this.emailExists) {
          this.clientCollection.add(this.clientObj).then(res => {
            this.isLoading = false
            this.isSuccess = true;
          })
        } else {
          this.isLoading = false
          this.isSuccess = false;
          return;
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  get f() {
    return this.registerForm.controls;
  }

}
