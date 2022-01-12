import {Component, OnInit} from '@angular/core';
import {IMilestone, IProject, ITier, IUser} from "../../../../@webqube/models/models";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";
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

  baseMilestones = Milestones.map(obj => ({...obj, selected: false}));
  baseBoard = scrumboard;

  project: Observable<IProject | undefined>;
  milestones: Observable<IMilestone[] | undefined>;
  boards: Observable<IScrumboard[] | undefined>;
  currentProject: IProject;
  activeMilestone = new BehaviorSubject<IMilestone>(null);
  activeBoard = new BehaviorSubject<IScrumboard>(null);

  user: Observable<IUser | null>;
  private projectDoc: AngularFirestoreDocument<IProject>;
  private boardDoc: AngularFirestoreDocument<IScrumboard>;
  private tierDoc: AngularFirestoreDocument<ITier>;
  private milestoneDoc: AngularFirestoreDocument<IMilestone>;

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

    let id = this.route.snapshot.params['id'];

    this.projectDoc = this.afs.doc<IProject>('projects/' + id);




    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(prj => {
      this.currentProject = prj;
      this.form.get('domainName')?.patchValue(prj?.domain);
    })

    this.milestones = this.afs.collection<IMilestone>('milestones',
      ref => ref.where('projectID', '==', id)).valueChanges({idField: 'id'})


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

  async onUpdateProject() {
    this.isSavingTier = true;

    for await (const milestone of this.baseMilestones) {
      console.log('start')
      milestone.projectID = this.currentProject.id;
      await this.afs.collection<IMilestone>('milestones').add(milestone).then(value => {
        this.baseBoard.milestoneID = value.id;
        return this.afs.doc<IMilestone>('milestones/'+value.id).update({id:value.id}) ;
      });

      this.baseBoard.label = milestone.label
      await this.afs.collection<IScrumboard>('boards').add(this.baseBoard).then(value => {
        return this.afs.doc<IScrumboard>('boards/'+value.id).update({id:value.id}) ;
      });
    }

    let selectedTier = this.tiers.filter(obj => obj.selected)[0]
    const fsProject = await this.projectDoc.update({tierID: selectedTier.id,});
    console.log("res", fsProject);
    this.isSavingTier = false;
  }

  onSelectMilestone(milestone: IMilestone) {
    // @ts-ignore
    this.activeMilestone.next(milestone)
    this.boards = this.afs.collection<IScrumboard>('boards',
      ref => ref.where('milestoneID', '==', milestone.id)).valueChanges()

    this.boards.subscribe(value => {
      this.activeBoard.next(value[0])
    })

  }

  sortByOrder(milestones: IMilestone[]): IMilestone[]{
    return milestones.sort((a,b)=> (a.order < b.order ? -1 : 1))
  }



}
