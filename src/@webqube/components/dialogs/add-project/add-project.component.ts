import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IPlan, IProject} from "../../../models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {ProjectService} from "../../../services/project.service";
import {first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


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
    private http: HttpClient,
    private fns: AngularFireFunctions,
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

    const authenticatePortainer = this.fns.httpsCallable('authenticatePortainer')
    const createApp = this.fns.httpsCallable('createApp')
    let name: string;

    this.projectCollection = this.afs.collection<IProject>('projects');
    this.projectCollection.ref.where('userID', '==', this.user.uid).where('title', '==', this.projectObj.title).get().then(projectRef => {
      if (projectRef.empty) {
        authenticatePortainer({}).pipe(first()).toPromise()
          .then((res: { jwt: string }) => {
            name = this.projectObj.title.replace(/\s/g, "-") + this.user.uid.substring(0, 5);
            name = name.toLowerCase();
            return createApp(
              {
                name: name,
                jwt: res.jwt
              }).pipe(first()).toPromise()
          })
          .then((res) => {
            const data = {url: 'https://' + name + '.webqube.de'};
            console.log("res after create app", {...res, ...data});
            this.projectObj.previewBackend = data.url
            return this.projectService.createProject(this.projectObj)
          })
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

  closeDialog(){
    this.dialogRef.close();
  }


}
