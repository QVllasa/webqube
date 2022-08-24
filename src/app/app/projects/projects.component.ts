import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../@webqube/components/dialogs/register/register.component";
import {AddProjectComponent} from "../../../@webqube/components/dialogs/add-project/add-project.component";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IProject} from "../../../@webqube/models/models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Observable<IProject[]>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              private auth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.projects = this.afs.collection<IProject>('projects',
        ref => ref.where('userID','==', user?.uid )).valueChanges({idField: 'id'})
    })



  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProjectComponent,{ disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  goToProject(project: IProject) {
    this.router.navigate(['project',project.id], {relativeTo: this.route.parent})
  }
}
