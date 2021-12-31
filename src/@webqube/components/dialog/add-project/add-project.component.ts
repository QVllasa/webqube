import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {doc, getDoc} from "firebase/firestore";
import {IClient, IProject, ITier, IWork} from "../../../models";
import {Tiers} from "../../../static";


@Component({
  selector: 'app-request',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  tiers = Tiers;
  selectedTier: ITier;

  isLoading: boolean = false;
  isSuccess: boolean = false;

  projectForm = new FormGroup({
    title: new FormControl({value: '', disabled: this.isLoading}, [Validators.required]),
    tier: new FormControl({value: '', disabled: this.isLoading}, [Validators.required, Validators.email]),
    isMonthly: new FormControl({value: '', disabled: this.isLoading}),
  });

  projectObj: IProject;


  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITier,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.projectForm.valueChanges.subscribe((data) => {
      this.projectObj = data
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend() {
    this.isLoading = true;
    if (!this.projectForm.valid) {
      console.log("not valid")
      return;
    }
    console.log(this.projectObj)
  }

  get f() {
    return this.projectForm.controls;
  }

}
