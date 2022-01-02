import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../@webqube/components/dialog/register/register.component";
import {AddProjectComponent} from "../../../@webqube/components/dialog/add-project/add-project.component";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IProject} from "../../../@webqube/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Observable<IProject[]>;

  constructor(public dialog: MatDialog,
              private afs: AngularFirestore,
              private auth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      console.log(user?.uid)
      this.projects = this.afs.collection<IProject>('projects',
        ref => ref.where('userID','==', user?.uid )).valueChanges()
    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProjectComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
