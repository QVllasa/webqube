import {Injectable} from '@angular/core';
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";
import {BehaviorSubject, combineLatest, forkJoin, Observable, of} from "rxjs";
import {IHosting, IMilestone, IProject, IPlan, IUser, IFeature} from "../models/models";
import {filter, first, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
import {Hostings, Milestones, Tiers} from "../static/static";
import {MilestoneService} from "./milestone.service";
import {BoardService} from "./board.service";
import {RouteParamsService} from "./route-params.service";

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
              private routeParamsService: RouteParamsService) {

    // TODO create project with boards, lists and cards
    this.routeParamsService.routeParamsChange$
      .pipe(
        map(params => {
          return params['projectID'];
        }),
        tap(id => {
          this.projectDoc = this.afs.collection('projects').doc<IProject>(id);
        }),
        switchMap((params) => {
          return this.getProject();
        })
      )
      .subscribe((project) => {
        this.project.next(project)
      });
  }

  async initProject(plan: IPlan, id: string) {

    const defaultBoard = this.boardSerivce.initBoard(id);

    for await (const milestone of this.milestoneService.milestones.value) {
      const board: IBoard = {...defaultBoard['board'], ...milestone, milestoneID: milestone.id}
      console.log("board ", board)
      const boardRef = await this.boardSerivce.boardColl.add(board)
      for await (const list of defaultBoard['list']) {
        const listRef = await this.boardSerivce.listColl.add({...list, boardID: boardRef.id})
        await this.boardSerivce.cardColl.add({
          ...defaultBoard['card'],
          listID: listRef.id
        })
      }
    }

    const addons = await this.afs.collection<IFeature>('addons').valueChanges().pipe(first()).toPromise()
    const featureKeys = ['pageCount', 'cms', 'forms', 'cmsAssets', 'eventPlanning', 'privacySettings', 'advancedAnalytics'];
    let features: IFeature[] = [];
    plan.allFeatures.forEach((obj, index)=>{
      featureKeys.forEach((key)=>{
        if (key in obj){
          features.push(obj)
        }
      })
    })

    features = [...features, ...addons];

    console.log("features", features)

    await this.projectDoc.update({planID: plan.id, features: features});
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
