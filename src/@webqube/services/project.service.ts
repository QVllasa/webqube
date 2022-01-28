import {Injectable} from '@angular/core';
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {IMilestone, IProject, ITier, IUser} from "../models/models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  user: Observable<IUser | null>;

  tiers: ITier[];
  milestones = new BehaviorSubject<IMilestone[]>(null);
  board: IBoard;
  boards = new BehaviorSubject<IBoard[]>(null);

  public id = new BehaviorSubject<string>(null);
  public project$ = new BehaviorSubject<IProject>(null);

  private projectDoc: AngularFirestoreDocument<IProject>;
  private tiersColl: AngularFirestoreCollection<ITier>;
  private boardsColl: AngularFirestoreCollection<IScrumboard>;
  private milestoneColl: AngularFirestoreCollection<IMilestone>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.id.next(param['id'])
    })

    this.projectDoc = this.afs.doc<IProject>('projects/' + this.id);
    this.boardsColl = this.projectDoc.collection('boards')
    this.milestoneColl = this.afs.collection<IMilestone>('milestones/');
    this.tiersColl = this.afs.collection<ITier>('tiers');
    this.milestoneColl.valueChanges({idField: 'id'}).subscribe(milestones => {
      this.milestones.next(milestones)
    })


    this.tiersColl.valueChanges({idField: 'id'}).subscribe(tiers => {
      this.tiers = tiers.map(obj => ({...obj, selected: false}));
    })

    this.projectDoc.valueChanges().subscribe(prj => {
      this.project$.next(prj);
    })

    this.getBoards();
  }

  async initProject() {
    let board: IScrumboard = {
      milestoneID: '',
      paid: false,
      selected: false,
      state: 'waiting',
      projectID: this.id.value,
    };

    let list: IScrumboardList[] = [
      {label: 'Geplant'},
      {label: 'In Bearbeitung'},
      {label: 'Erledigt'}
    ]

    let card: IScrumboardCard = {
      title: "Erste Aufgabe"
    }

    for await (const milestone of this.milestones.value) {
      board.milestoneID = milestone.id;
      const boardId = await this.boardsColl.add(board)
      for await (const item of list) {
        const listID = await this.projectDoc.collection('boards').doc(boardId.id).collection('lists').add(item);
        await this.projectDoc
          .collection<IScrumboard>('boards').doc(boardId.id)
          .collection<IScrumboardList>('lists').doc(listID.id)
          .collection<IScrumboardCard>('cards').add(card)
      }
    }

    let selectedTier = this.tiers.filter(obj => obj.selected)[0]
    await this.projectDoc.update({tierID: selectedTier.id,});
  }

  updateProject(data: any) {
    return this.projectDoc.update(data)
  }

  getBoards() {
    return this.boardsColl.valueChanges({idField: 'id'})
      .pipe(
        map((boards) => {
          let list: IBoard[] = [];
          boards.forEach(board => {
            this.milestones.value.forEach(milestone => {
              if (board.milestoneID === milestone.id) {
                list.push({...milestone, ...board,})
              }
            })
          })
          return list
        }))
      .subscribe((boards) => {
        this.boards.next(boards);
        console.log("boards", this.boards)
      })
  }

}
