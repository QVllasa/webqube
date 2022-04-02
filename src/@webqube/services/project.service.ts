import {Injectable} from '@angular/core';
import {IBoard} from "../models/scrumboard.interface";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {IFeature, IPlan, IProject} from "../models/models";
import {first, map, switchMap, tap} from "rxjs/operators";
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

    // TODO Fields to take over to addons rather than leave them in plans features
    const addons = await this.afs.collection<IFeature>('addons').valueChanges().pipe(first()).toPromise()
    const featureKeys = ['contentAnalysis','pageCount', 'cms', 'forms', 'cmsAssets', 'eventPlanning', 'privacySettings', 'advancedAnalytics'];
    let features: IFeature[] = [];
    // plan.addons.forEach((obj, index) => {
    //   featureKeys.forEach((key) => {
    //     if (key in obj) {
    //       features.push(obj)
    //     }
    //   })
    // })

    features = [...features, ...addons];

    console.log("features", features)

    // await this.projectDoc.update({planID: plan.id, features: features});
  }

  updateProject(data: IProject) {
    return this.projectDoc.update(data)
  }

  createProject(data: IProject){
    return this.afs.collection('projects').add(data).then((res) => {
      return res.id
    }).then(()=>{
      //todo notify on create project
      return
    });
  }


  getProject(): Observable<IProject> {
    return this.projectDoc.valueChanges({idField: 'id'})
  }

  async deleteProject() {
    // const boards = await this.boardSerivce.boardColl.valueChanges({idField: 'id'}).pipe(first()).toPromise()
    // for await (let board of boards) {
    //   await this.boardSerivce.deleteBoards(board.id);
    //   const lists = await this.boardSerivce.deleteLists(board.id);
    //   for await (let list of lists) {
    //     await this.boardSerivce.deleteCard(list.id)
    //   }
    //
    // }
    await this.projectDoc.delete();
  }

}
