import {Injectable} from '@angular/core';
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, forkJoin, Observable, of} from "rxjs";
import {IHosting, IMilestone, IProject, IPlan, IUser} from "../models/models";
import {filter, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
import {Hostings, Milestones, Tiers} from "../static/static";
import {MilestoneService} from "./milestone.service";
import {BoardService} from "./board.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // staticMilestones = Milestones;
  // staticTiers = Tiers;
  // staticHostings = Hostings;


  public project = new BehaviorSubject<IProject>(null);

  private projectDoc: AngularFirestoreDocument<IProject>;


  constructor(private afs: AngularFirestore,
              private milestoneService: MilestoneService,
              private boardSerivce: BoardService,
              private route: ActivatedRoute) {
    this.route.params
      .pipe(
        map(params=> {
          return params['id']
        }),
        tap(id => {
          console.log("params: ", id);
          this.projectDoc = this.afs.collection('projects').doc<IProject>(id);
        }),
        switchMap((params) => {
          return this.getProject();
        })
      )
      .subscribe(project => {
        this.project.next(project)
      })

  }

  async initProject(plan: IPlan, id: string) {

    const defaultBoard = this.boardSerivce.initBoard(id);

    let boards: IBoard[] = [];

    for await (const milestone of this.milestoneService.milestones.value) {
      const board = {...defaultBoard['board'], ...milestone}
      console.log("board ", board)
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
    // await this.projectDoc.update({tierID: plan.id});
  }

  updateProject(data: IProject) {
    return this.projectDoc.update(data)
  }


  getProject(): Observable<IProject> {
    return this.projectDoc.valueChanges({idField: 'id'})
  }

  async deleteProject() {
    await this.projectDoc.delete();
  }

}
