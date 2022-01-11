import {Component, OnInit} from '@angular/core';
import {IMilestone, IProject, ITier, IUser} from "../../../../@webqube/models/models";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Milestones, Tiers} from "../../../../@webqube/static/static";
import {scrumboard} from "../../../../@webqube/static/scrumboard";
import {IScrumboard} from "../../../../@webqube/models/scrumboard.interface";
import {map, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent {

  tiers = Tiers.map(obj => ({...obj, selected: false}));

  milestones: IMilestone[] = Milestones.map(obj => ({...obj, selected: false}));
  board = scrumboard;

  project: Observable<IProject | undefined>;
  user: Observable<IUser | null>;
  private projectDoc: AngularFirestoreDocument<IProject>;
  private boardDoc: AngularFirestoreDocument<IScrumboard>;
  private tierDoc: AngularFirestoreDocument<ITier>;

  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  form = new FormGroup({
    domainName: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)])
  });
  isLoading: boolean = false;
  isSaving: boolean = false;
  isSavingTier: boolean = false;
  isSelecting: boolean = false;
  selected: boolean = false;


  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private http: HttpClient,
              private auth: AngularFireAuth) {

    this.milestones[0].selected = true;
    let id = this.route.snapshot.params['id'];

    this.projectDoc = this.afs.doc<IProject>('projects/' + id);

    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(prj => {
      this.form.get('domainName')?.patchValue(prj?.domain);
    })
    this.user = this.auth.user;
  }

  checkDomain() {
    this.isLoading = true;
    if (!this.form.valid) {
      console.log("not valid")
      this.isLoading = false;
      return;
    } else {

    }
    this.http.get('https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_Rrtx7WJLgsD8nX0uoAkzdgGNsIJcN&domainName=' + this.form.get('domainName')?.value)
      .subscribe(
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
            this.form.get('domainName')?.patchValue('')
            this.isLoading = false;
          }

        },
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
      )
  }

  saveDomain() {
    this.isSaving = true
    this.projectDoc.update({domain: this.form.get('domainName')?.value})
      .then(res => {
        console.log(res);
        this.isSaving = false;
      });
  }

  onSelectTier(tier: { features: string[]; mostSelected: boolean; icon: string; description: string; id: string; monthlyPrice: number; fixPrice: number; plan: string; selected: boolean }) {
    this.tiers.find(obj => obj === tier).selected = !tier.selected;
    this.tiers.filter(obj => obj !== tier).map(obj => obj.selected = false);
  }

  isSelected() {
    return this.tiers.some(obj => obj.selected)
  }

  onUpdateProject() {
    this.isSavingTier = true;
    this.milestones.forEach((obj) => {
      obj.board = this.board;
    });
    let selectedTier = this.tiers.filter(obj => obj.selected)[0]
    this.projectDoc.update({
      tierID: selectedTier.id,
      tier: selectedTier,
      milestones: this.milestones,
      milestonesIDs: this.milestones.map(obj => obj.id)
    })
      .then(res => {
        console.log("res", res);
        this.isSavingTier = false;
      });
  }

  onSelectMilestone(milestone: { paid: boolean; icon: string; description: string; step: string; state: "progressing" | "pausing" | "waiting"; selected?: boolean }) {
    // @ts-ignore
    this.isSelecting = true;
    this.project.pipe(take(1), map(prj => {
      console.log(prj)
      prj.milestones.find(obj => obj === milestone).selected = !milestone.selected;
      prj.milestones.filter(obj => obj !== milestone).map(obj => obj.selected = false);
      return this.projectDoc.update(prj)
    })).subscribe(()=>{this.isSelecting = false;})
  }

  //TODO define get milestones and get boards in model

  getBoardTitle() {
    return this.milestones.find(obj => obj.selected).step
  }


}
