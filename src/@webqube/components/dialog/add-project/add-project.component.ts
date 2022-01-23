import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {doc, getDoc} from "firebase/firestore";
import {IClient, IProject, ITier, IWork} from "../../../models/models";
import {Tiers} from "../../../static/static";
import {TUI_CHECKBOX_DEFAULT_OPTIONS, TUI_CHECKBOX_OPTIONS, TUI_TEXTFIELD_APPEARANCE} from "@taiga-ui/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;


@Component({
  selector: 'app-request',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectComponent implements OnInit {

  tiers = Tiers;
  selectedTier: ITier;

  isLoading: boolean = false;
  isSuccess: boolean = false;

  projectForm = new FormGroup({
    title: new FormControl({value: '', disabled: this.isLoading}, [Validators.required]),
  });

  projectObj: IProject;
  private projectCollection: AngularFirestoreCollection<IProject>;
  private user: firebase.User | null;


  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    private fns: AngularFireFunctions,
    @Inject(MAT_DIALOG_DATA) public data: ITier,
    private auth: AngularFireAuth,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.auth.user.subscribe(userInfo => {
      this.user = userInfo;
    })
    this.projectForm.valueChanges.subscribe((data) => {
      this.projectObj = {...data, userID: this.user?.uid}
    })
  }

  onSend() {
    this.isLoading = true;
    if (!this.projectForm.valid) {
      console.log("not valid")
      return;
    }
    console.log(this.projectObj)

    this.projectCollection = this.afs.collection<IProject>('projects');
    this.projectCollection.add(this.projectObj).then((res) => {
      return res.id
    }).then((id)=>{
      return this.afs.doc<IProject>('projects/'+id).update({id: id})
    }).then(()=>{
      return this.fns.httpsCallable('sendEmail')
    })
      .then(()=>{
        this.isLoading = false;
        this.dialogRef.close()
      })
  }

  get f() {
    return this.projectForm.controls;
  }


}
