import {Injectable} from '@angular/core';
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, forkJoin, Observable, of} from "rxjs";
import {IHosting, IMilestone, IProject, ITier, IUser} from "../models/models";
import {filter, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
import {Hostings, Milestones, Tiers} from "../static/static";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  staticMilestones = Milestones;
  staticTiers = Tiers;
  staticHostings = Hostings;

  user: Observable<IUser | null>;
  tiers = new BehaviorSubject<ITier[]>(null);
  milestones = new BehaviorSubject<IMilestone[]>(null);
  // boards = new BehaviorSubject<IBoard[]>(null);

  public id = new BehaviorSubject<string>(null);
  public project = new BehaviorSubject<IProject>(null);
  // public activeBoard = new BehaviorSubject<IBoard>(null);

  private projectDoc: AngularFirestoreDocument<IProject>;
  private tiersColl: AngularFirestoreCollection<ITier>;
  private hostingsColl: AngularFirestoreCollection<IHosting>;
  private scrumboardColl: AngularFirestoreCollection<IScrumboard>;
  private scrumboardListColl: AngularFirestoreCollection<IScrumboardList>;
  private scrumboardCardsColl: AngularFirestoreCollection<IScrumboardCard>;
  private milestoneColl: AngularFirestoreCollection<IMilestone>;


  constructor(private afs: AngularFirestore) {
    this.id
      .pipe(
        filter<string>(Boolean),
        switchMap((id) => {
          console.log("current ID ", id)
          this.projectDoc = this.afs.collection('projects').doc<IProject>(id);
          return this.getProject();
        })
      )
      .subscribe(
        (project) => {
          // let project: IProject = this.mapProject(data);
          console.log("project ", project);
          this.project.next(project)
        })

    this.milestoneColl = this.afs.collection<IMilestone>('milestones');
    this.tiersColl = this.afs.collection<ITier>('tiers');
    this.hostingsColl = this.afs.collection<IHosting>('hostings');


    this.tiersColl.valueChanges({idField: 'id'})
      .pipe(take(1), map(tiers => {
        return tiers.sort((a, b) => {
          return a.order - b.order;
        });
      }))
      .subscribe(tiers => {
      this.tiers.next(tiers.map(obj => ({...obj, selected: false})));
    })
    this.milestoneColl.valueChanges({idField: 'id'})
      .pipe(take(1))
      .subscribe(milestones => {
      this.milestones.next(milestones)
    })
  }

  async initProject(tier: ITier) {

    let card: IScrumboardCard = {
      title: "Erste Aufgabe",
      projectID: this.id.value
    }

    let scrumboardLists: IScrumboardList[] = [
      {label: 'Geplant', projectID: this.id.value, order: 0, cards: [card]},
      {label: 'In Bearbeitung', projectID: this.id.value, order: 1, cards: [card]},
      {label: 'Erledigt', projectID: this.id.value, order: 2, cards: [card]}
    ]

    let scrumboard: IScrumboard = {
      paid: false,
      selected: false,
      state: 'waiting',
      projectID: this.id.value,
      list: scrumboardLists
    };

    let boards: IBoard[] =[];

    for (const milestone of this.milestones.value){
      let mergedBoard = {...milestone, ...scrumboard};
      boards.push(mergedBoard)
    }

    await this.projectDoc.update({tierID: tier.id, boards: boards});
  }

  updateProject(data: IProject) {
    return this.projectDoc.update(data)
  }

  activateBoard(id: string, paid: boolean) {
    return this.scrumboardColl.doc(id).update({paid: paid})
  }


  getProject(): Observable<IProject> {
    return this.projectDoc.valueChanges({idField: 'id'})
  }

  getTier(): ITier {
    return this.tiers.value.find(obj => obj.id === this.project.value.tierID)
  }

  async deleteProject() {
    await this.projectDoc.delete();
  }

}
