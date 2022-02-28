import {Component} from '@angular/core';
import {IMilestone, IProject, ITier, IUser} from "../../../../@webqube/models/models";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IBoard, IScrumboard} from "../../../../@webqube/models/scrumboard.interface";
import {map, switchMap, take, tap} from 'rxjs/operators';
import {IScrumboardList} from "../../../../@webqube/models/scrumboard-list.interface";
import {IScrumboardCard} from "../../../../@webqube/models/scrumboard-card.interface";
import {ProjectService} from "../../../../@webqube/services/project.service";
import {UserService} from "../../../../@webqube/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProjectComponent} from "../../../../@webqube/components/dialogs/delete-project/delete-project.component";


@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent {

  user: IUser;
  project: IProject;
  boardID: string;

  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  form = new FormGroup({
    domain: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    title: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;
  isSaving: boolean = false;
  isSavingTier: boolean = false;
  isDeleting: boolean = false;
  isSelecting: boolean = false;
  selected: boolean = false;


  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private http: HttpClient,
              private auth: AngularFireAuth,
              public projectService: ProjectService,
              public userService: UserService) {

    this.route.params.subscribe((param) => {
      this.projectService.id.next(param['projectID'])
      this.boardID = param['boardID'];
      console.log("is route param",this.boardID)
    })

    this.projectService.project.subscribe((project) => {
      if (!project) {
        return;
      }
      this.project = project;
      this.form.patchValue({domain: project.domain ? project.domain : '', title: project.title});
    })

    this.userService.user$.subscribe((user) => {
      this.user = user;
    })
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

  saveDomain() {
    this.isSaving = true
    this.projectService.updateProject({domain: this.form.get('domain')?.value})
      .then(res => {
        console.log(res);
        this.isSaving = false;
      });
  }

  onSelectTier(tier: ITier) {
    // this.projectService.tiers.value.find(obj => obj === tier).selected = !tier.selected;
    // this.projectService.tiers.value.filter(obj => obj !== tier).map(obj => obj.selected = false);
  }

  isSelected(tier: ITier) {
    return true;
  }

  async initProject() {
    this.isSavingTier = true;
    await this.projectService.initProject()
    this.isSavingTier = false;
  }

  updateTitle() {
    if (!this.isValid('Titel darf nicht leer sein!', 'title')) {
      return;
    }
    this.projectService.updateProject(this.form.value)
  }

  onSelectBoard(board: IBoard) {
    this.router.navigate(['', board.id], {relativeTo: this.route})
  }

  // isSelectedBoard(board: IBoard) {
  //   console.log("is selected ",board.id)
  //   return this.boardID === board.id;
  // }

  sortByOrder(obj: IBoard[]): IBoard[] {
    return obj.sort((a, b) => (a.order < b.order ? -1 : 1))
  }

  getTier(): ITier {
    return this.projectService.getTier();
  }

  deleteProject() {
    this.dialog.open(DeleteProjectComponent, {disableClose: true}).afterClosed().subscribe((val) => {
      if (val === 'success') {
        this.router.navigate(['dashboard/projects'])
      }
    })
  }
}
