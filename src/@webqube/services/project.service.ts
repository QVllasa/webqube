import {Injectable} from '@angular/core';
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, forkJoin, Observable, of} from "rxjs";
import {IMilestone, IProject, ITier, IUser} from "../models/models";
import {filter, map, mergeMap, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  user: Observable<IUser | null>;
  tiers = new BehaviorSubject<ITier[]>(null);
  milestones = new BehaviorSubject<IMilestone[]>(null);
  boards = new BehaviorSubject<IBoard[]>(null);

  public id = new BehaviorSubject<string>(null);
  public project = new BehaviorSubject<IProject>(null);

  private projectDoc: AngularFirestoreDocument<IProject>;
  private tiersColl: AngularFirestoreCollection<ITier>;
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
          this.scrumboardColl = this.afs.collection('boards', ref => ref.where('projectID', '==', id));
          this.scrumboardListColl = this.afs.collection('lists', ref => ref.where('projectID', '==', id))
          this.scrumboardCardsColl = this.afs.collection('cards', ref => ref.where('projectID', '==', id))
          return this.getData();
        })
      )
      .subscribe(
        (data) => {

          let project: IProject = this.mapProject(data);
          console.log("project ", project);
          this.project.next(project)
        },
        (err) => {
          console.log("err ", err)
        },
        () => {
          console.log('complete')
        },
      )

    this.milestoneColl = this.afs.collection<IMilestone>('milestones');
    this.tiersColl = this.afs.collection<ITier>('tiers');
    this.tiersColl.valueChanges({idField: 'id'}).subscribe(tiers => {
      this.tiers.next(tiers.map(obj => ({...obj, selected: false})));
    })
    this.milestoneColl.valueChanges({idField: 'id'}).subscribe(milestones => {
      this.milestones.next(milestones)
    })
  }

  async initProject() {
    let scrumboard: IScrumboard = {
      milestoneID: '',
      paid: false,
      selected: false,
      state: 'waiting',
      projectID: this.id.value,
    };

    let scrumboardLists: IScrumboardList[] = [
      {label: 'Geplant', projectID: this.id.value, order: 0,},
      {label: 'In Bearbeitung', projectID: this.id.value, order: 1},
      {label: 'Erledigt', projectID: this.id.value, order: 2}
    ]

    let card: IScrumboardCard = {
      title: "Erste Aufgabe",
      projectID: this.id.value
    }

    for await (const milestone of this.milestones.value) {
      scrumboard.milestoneID = milestone.id;
      const scrumboardRef = await this.scrumboardColl.add(scrumboard)
      for await (const list of scrumboardLists) {
        const scrumboardListRef = await this.scrumboardListColl.add({...list, scrumboardID: scrumboardRef.id})
        await this.scrumboardCardsColl.add({
          ...card,
          scrumboardID: scrumboardRef.id,
          scrumboardListID: scrumboardListRef.id
        })
      }
    }

    let selectedTier = this.tiers.value.filter(obj => obj.selected)[0]
    await this.projectDoc.update({tierID: selectedTier.id,});
  }

  updateProject(data: any) {
    return this.projectDoc.update(data)
  }

  getData() {
    return combineLatest([
      this.getProject(),
      this.getScrumboards(),
      this.getScrumboardLists(),
      this.getScrumboardCards()
    ])
  }

  getProject(): Observable<IProject> {
    return this.projectDoc.valueChanges({idField: 'id'})
  }

  mapProject(data: [IProject, IBoard[], IScrumboardList[], IScrumboardCard[]]): IProject {
    let project: IProject = data[0];
    let boards: IBoard[] = data[1];
    let lists: IScrumboardList[] = data[2];
    let cards: IScrumboardCard[] = data[3];

    lists.forEach(list => {
      list.cards = cards.filter(obj => obj.scrumboardListID === list.id)
    })

    boards.forEach(board => {
      board.list = lists.filter(obj => obj.scrumboardID === board.id);
    })

    project.boards = boards;

    return project
  }

  getScrumboards(): Observable<IBoard[]> {
    return this.scrumboardColl.valueChanges({idField: 'id'})
      .pipe(map((scrumboards) => {
        let boards: IBoard[] = [];
        scrumboards.forEach(scrumboard => {
          let milestone = this.milestones.value.filter(obj => obj.id === scrumboard.milestoneID)[0]
          boards.push({...milestone, ...scrumboard})
        })
        return boards;
      }))
  }


  getScrumboardLists(): Observable<IScrumboardList[]> {
    return this.scrumboardListColl
      .valueChanges({idField: 'id'})
  }

  getScrumboardCards(): Observable<IScrumboardCard[]> {
    return this.scrumboardCardsColl
      .valueChanges({idField: 'id'})
  }

  createCard(card: IScrumboardCard) {
    return this.scrumboardCardsColl.add(card);
  }

  updateCard(card: IScrumboardCard) {
    console.log(card);
    return this.scrumboardCardsColl.doc(card.id).update(card);
  }

  deleteCard(card: IScrumboardCard) {
    return this.scrumboardCardsColl.doc(card.id).delete();
  }

  getTier(): ITier {
    return this.tiers.value.find(obj => obj.id === this.project.value.tierID)
  }

  async deleteProject() {
    await this.projectDoc.delete();
    await this.deleteCollection(this.scrumboardColl);
    await this.deleteCollection(this.scrumboardListColl);
    await this.deleteCollection(this.scrumboardCardsColl)
  }

  async deleteCollection(collection: AngularFirestoreCollection,) {
    await collection.ref.get().then(ref => {
      ref.forEach(doc => {
        collection.doc(doc.id).delete();
      })
    })
  }

}
