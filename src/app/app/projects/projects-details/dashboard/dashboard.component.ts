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
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../../@webqube/services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSaving: boolean = false;

  isDeleting: boolean = false;
  showFeatures: boolean;
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
              private route: ActivatedRoute,
              public userService: UserService, private http: HttpClient) {

    this.project$ = this.projectService.project$;
    this.project$
      .pipe(filter(project => project !== null))
      .subscribe(project => {
        this.features = this.projectService.getFeatures(project);
        this.form.patchValue({domain: project.domain ? project.domain : '', title: project.title});
      })

    this.userService.user$.subscribe((user) => {
      this.user = user;
    })
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
              this._snackBar.open('Domain verfügbar und gespeichert!️', '',
                {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'end',
                  panelClass: ['bg-green-500', 'text-white']
                });
              this.isLoading = false;
            } else {
              this._snackBar.open('Domain nicht verfügbar!', '',
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
    this.projectService.updateProject(this.form.value).then(()=>{
      this._snackBar.open('Änderung gespeichert!', '',
        {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: ['bg-green-500', 'text-white']
        });
    })
  }

  deleteProject() {
    if(!this.project$.value){
      return;
    }
    this.dialog.open(DeleteProjectComponent, {
      data: this.project$.value,
      disableClose: true
    }).afterClosed().subscribe((val) => {
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

  toggleFeatures() {
    this.showFeatures = !this.showFeatures;
  }
}
