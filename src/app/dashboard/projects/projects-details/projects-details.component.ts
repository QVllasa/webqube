import {Component} from '@angular/core';
import {IBoard, IMilestone, IProject, ITier, IUser} from "../../../../@webqube/models/models";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IScrumboard} from "../../../../@webqube/models/scrumboard.interface";
import {map, take, tap} from 'rxjs/operators';
import {IScrumboardList} from "../../../../@webqube/models/scrumboard-list.interface";
import {IScrumboardCard} from "../../../../@webqube/models/scrumboard-card.interface";


@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent {

  tiers: ITier[]; //= Tiers.map(obj => ({...obj, selected: false}));
  milestones: IMilestone[];
  board: IBoard;
  boards: IBoard[];

  project: IProject;
  activeBoard = new BehaviorSubject<IBoard>(null);

  user: Observable<IUser | null>;
  private projectDoc: AngularFirestoreDocument<IProject>;
  private tiersColl: AngularFirestoreCollection<ITier>;
  private milestoneColl: AngularFirestoreCollection<IMilestone>;
  private boardsColl: AngularFirestoreCollection<IScrumboard>;

  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


  form = new FormGroup({
    domain: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    title: new FormControl('', [Validators.required])
  });


  isLoading: boolean = false;
  isSaving: boolean = false;
  isSavingTier: boolean = false;
  isSelecting: boolean = false;
  selected: boolean = false;
  id:string;


  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private http: HttpClient,
              private auth: AngularFireAuth) {

    this.id = this.route.snapshot.params['id'];

    this.projectDoc = this.afs.doc<IProject>('projects/' + this.id);
    this.milestoneColl = this.afs.collection<IMilestone>('milestones/');
    this.boardsColl = this.afs.collection<IScrumboard>('boards/', ref => ref.where('projectID', '==', this.id));
    this.tiersColl = this.afs.collection<ITier>('tiers');

    this.milestoneColl.valueChanges({idField: 'id'}).subscribe(milestones => {
      this.milestones = milestones;
    })

    this.boardsColl.valueChanges({idField: 'id'})
      .pipe(
        map((boards) => {
          let list: IBoard[] = [];
          boards.forEach(board => {
            this.milestones.forEach(milestone => {
              if (board.milestoneID === milestone.id) {
                list.push({...board, ...milestone})
              }
            })
          })
          return list
        }))
      .subscribe((boards) => {
        this.boards = boards;
      })

    this.tiersColl.valueChanges({idField: 'id'}).subscribe(tiers => {
      this.tiers = tiers.map(obj => ({...obj, selected: false}));
    })

    this.projectDoc.valueChanges().subscribe(prj => {
      this.project = prj;
      this.form.patchValue({domain: prj.domain, title: prj.title});
    })

    this.user = this.auth.user;
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
            return this.projectDoc.update(this.form.value)
          }))
      .subscribe()

  }

  saveDomain() {
    this.isSaving = true
    this.projectDoc.update({domain: this.form.get('domain')?.value})
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

  async initProject() {
    this.isSavingTier = true;
    let board: IScrumboard = {
      milestoneID: '',
      paid: false,
      selected: false,
      state: 'waiting',
      projectID: this.id,
    };

    let list: IScrumboardList[] = [
      {label: 'Geplant'}, {label: 'In Bearbeitung'}, {label: 'Erledigt'}]


    for await (const milestone of this.milestones) {
      board.milestoneID = milestone.id;
      const boardId = await this.afs.collection('boards').add(board)
      for await (const item of list) {
        await this.boardsColl.doc<IScrumboard>(boardId.id).collection('list').add(item)
      }
    }

    let selectedTier = this.tiers.filter(obj => obj.selected)[0]
    await this.projectDoc.update({tierID: selectedTier.id,});
    this.isSavingTier = false;
  }

  updateTitle() {
    if (!this.isValid('Titel darf nicht leer sein!', 'title')) {
      return;
    }
    this.projectDoc.update(this.form.value)
  }

  onSelectBoard(board: IBoard) {
    this.activeBoard.next(board)
  }

  isSelectedBoard(board: IBoard) {
    return this.activeBoard.value === board
  }

  sortByOrder(milestones: IMilestone[]): IMilestone[] {
    return milestones.sort((a, b) => (a.order < b.order ? -1 : 1))
  }


}
