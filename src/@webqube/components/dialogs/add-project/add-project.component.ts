import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IProject, IPlan} from "../../../models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {MailService} from "../../../services/mail.service";
import {ProjectService} from "../../../services/project.service";


@Component({
  selector: 'app-request',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {

  tiers: IPlan[];

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
    @Inject(MAT_DIALOG_DATA) public data: IPlan,
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.auth.user.subscribe(userInfo => {
      this.user = userInfo;
    })
    this.projectForm.valueChanges.subscribe((data) => {
      this.projectObj = {...data, userID: this.user?.uid}
    })
    this.afs.collection<IPlan>('tiers').valueChanges().subscribe(tiers => {
      this.tiers = tiers;
    })
  }

  onSend() {
    this.isLoading = true;
    if (!this.projectForm.valid) {
      console.log("not valid")
      this.isLoading = false;
      return;
    }

    this.projectCollection = this.afs.collection<IProject>('projects');
    this.projectCollection.ref.where('title', '==', this.projectObj.title).get().then(projectRef => {
      if (projectRef.empty) {
        this.projectService.createProject(this.projectObj)
          .then((emailres) => {
            console.log("email response", emailres)
            this.isLoading = false;
            this.dialogRef.close()
          })
        return;
      } else {
        this.f.title.setValue('');
        this.f.title.setErrors({exists: 'Projekt mit diesem Titel existiert bereits.'});
        this.isLoading = false;
        return;
      }
    })
  }

  get f() {
    return this.projectForm.controls;
  }


}
