import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {take, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {IPlan, IProject} from "../../../../../@webqube/models/models";
import {
  DeleteProjectComponent
} from "../../../../../@webqube/components/dialogs/delete-project/delete-project.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  project: IProject;
  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  form = new FormGroup({
    domain: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    title: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;

  constructor(private projectService: ProjectService, private http: HttpClient,) {
  }

  ngOnInit(): void {
    this.projectService.project$
      .subscribe((project) => {
        if (!project) {
          return;
        }
        console.log("project details", project)
        this.project = project;
        this.form.patchValue({domain: project.domain ? project.domain : '', title: project.title});
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
      this.form.patchValue(this.project)
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
    this.project.domain = this.form.get('domain')?.value
    this.projectService.updateProject(this.project)
      .then(res => {
        console.log(res);
        this.isSaving = false;
      });
  }

  onSelectTier(tier: IPlan) {
    this.plan$.value === tier ? this.plan$.next(null) : this.plan$.next(tier);
  }

  isSelected(tier: IPlan) {
    return this.plan$.value === tier;
  }

  async initProject(plan: IPlan) {
    this.isSavingTier = true;
    await this.projectService.initProject(plan, this.project.id)
    this.isSavingTier = false;
  }

  // getTier(): IPlan {
  // return this.planService.getPlan();
  // }

}
