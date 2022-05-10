import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {filter, take, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {IFeatureDetail, IPlan, IProject, IUser} from "../../../../../@webqube/models/models";
import {
  DeleteProjectComponent
} from "../../../../../@webqube/components/dialogs/delete-project/delete-project.component";
import {BehaviorSubject, Observable} from "rxjs";
import {PlanService} from "../../../../../@webqube/services/plan.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../../@webqube/services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSaving: boolean = false;

  isDeleting: boolean = false;
  user: IUser;

  project$ = new BehaviorSubject<IProject>(null);
  features: IFeatureDetail[] = [];
  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  form = new FormGroup({
    domain: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    title: new FormControl('', [Validators.required])
  });



  isLoading: boolean = false;

  constructor(private projectService: ProjectService, private router: Router,
              private dialog: MatDialog, private _snackBar: MatSnackBar,
              public userService: UserService, private http: HttpClient) {


    this.project$ = this.projectService.project$;

    this.project$
      .pipe(filter(project => project !== null))
      .subscribe(project => {
      this.features = this.getFeatures(project);
      this.form.patchValue({domain: project.domain ? project.domain : '', title: project.title});
    })

    this.userService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  ngOnInit(): void {

  }

  getFeatures(project: IProject): IFeatureDetail[] {
    if (!project.hasOwnProperty('features')) {
      return [];
    }
    const keys = Object.keys(project.features)
    let arr: IFeatureDetail [] = []
    keys.forEach(key => {
      arr.push(project.features[key])
    })
    return arr;
  }

  checkDomain() {
    this.isLoading = true;
    if (!this.isValid('Keine echte url!', 'domain')) {
      return;
    }

    this.http.get('https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_Rrtx7WJLgsD8nX0uoAkzdgGNsIJcN&domainName=' + this.form.get('domain')?.value)
      .pipe(
        take(1),
        tap(
          (res: any) => {
            console.log(res);
            if (res.DomainInfo.domainAvailability === 'AVAILABLE') {
              this._snackBar.open('Verfügbar!️ 😃 ', '',
                {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'end',
                  panelClass: ['bg-green-500', 'text-white']
                });
              this.isLoading = false;
            } else {
              this._snackBar.open('Nicht verfügbar!️ 😔', '',
                {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'end',
                  panelClass: ['bg-red-500', 'text-white']
                });
              this.form.get('domain')?.patchValue('')
              this.isLoading = false;
            }

          },
          err => console.log('HTTP Error', err),
          () => {
            return this.projectService.updateProject(this.form.value)
          }))
      .subscribe()

  }

  isValid(message: string, control: string): boolean {
    if (!this.form.get(control).valid) {
      this._snackBar.open(message, '',
        {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: ['bg-red-500', 'text-white']
        });
      this.form.patchValue(this.project$.value)
      return false;
    }
    return true;
  }

  updateTitle() {
    if (!this.isValid('Titel darf nicht leer sein!', 'title')) {
      return;
    }
    this.projectService.updateProject(this.form.value)
  }

  deleteProject() {
    this.dialog.open(DeleteProjectComponent, {disableClose: true}).afterClosed().subscribe((val) => {
      if (val === 'success') {
        this.router.navigate(['dashboard/projects'])
      }
    })
  }

  saveDomain() {
    this.isSaving = true
    this.project$.value.domain = this.form.get('domain')?.value
    this.projectService.updateProject(this.project$.value)
      .then(res => {
        console.log(res);
        this.isSaving = false;
      });
  }







  // getPlan(id: string): IPlan|string {
  // return this.planService.getPlan(id);
  // }

  log() {
    console.log('asdasdsad')
  }
}
