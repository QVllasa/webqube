import {Injectable} from '@angular/core';
import {IBoard} from "../models/scrumboard.interface";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, of} from "rxjs";
import {IFeatureDetail, IPlan, IProject} from "../models/models";
import {first, switchMap, tap} from "rxjs/operators";
import {MilestoneService} from "./milestone.service";
import {BoardService} from "./board.service";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public project$ = new BehaviorSubject<IProject>(null);

  private projectDoc: AngularFirestoreDocument<IProject>;


  constructor(private afs: AngularFirestore,
              private milestoneService: MilestoneService,
              private route: ActivatedRoute,
              private router: Router,
              private boardService: BoardService) {
  }

  loadProject(projectID: string) {
    if (!projectID){
      return;
    }
    this.boardService.setCollections(projectID);
    this.projectDoc = this.afs.collection<IProject>('projects').doc(projectID);
    this.projectDoc.ref.get().then(ref=>{
      if (ref.exists){
        this.projectDoc.valueChanges({idField: 'id'}).subscribe(project => {
          this.project$.next(project)
        })
      }else{
        this.router.navigate(['dashboard/projects']);
      }
    })


  }

  async initProject(plan: IPlan, projectID: string) {

    const defaultBoard = this.boardService.createBoard(projectID);

    for await (const milestone of this.milestoneService.milestones.value) {
      let board: IBoard = {...defaultBoard['board'], ...milestone, milestoneID: milestone.id}
      await this.boardService.boardColl.add(board)
    }

    let boardRefs = await this.boardService.boardColl.valueChanges({idField: 'id'}).pipe(first()).toPromise();
    for await(const boardRef of boardRefs) {
      for await (const list of defaultBoard['list']) {
        const listRef = await this.boardService.listColl.add({...list, boardID: boardRef.id})
        await this.boardService.cardColl.add({
          ...defaultBoard['card'],
          listID: listRef.id
        })
      }
    }


    await this.projectDoc.update({planID: plan.id, features: plan.features});
    await this.boardService.loadBoards();
  }

  updateProject(data: IProject) {
    return this.projectDoc.update(data)
  }

  createProject(data: IProject) {
    return this.afs.collection('projects').add(data).then((res) => {
      return res.id
    }).then(() => {
      //todo notify on create project
      return
    });
  }


  async deleteProject(projectID: string) {
    const boards = await this.afs.collection('boards', ref => ref.where('projectID', '==', projectID)).valueChanges({idField: 'id'}).pipe(first()).toPromise()
    for await (let board of boards) {
      await this.boardService.deleteBoard(board.id);
      const lists = await this.afs.collection<IScrumboardList>('lists', ref => ref.where('boardID', '==', board.id)).valueChanges({idField: 'id'}).pipe(first()).toPromise()
      for await(const list of lists) {
        await this.boardService.deleteList(list.id);
        const cards = await this.afs.collection<IScrumboardCard>('cards', ref => ref.where('listID', '==', list.id)).valueChanges({idField: 'id'}).pipe(first()).toPromise()
        for await (let card of cards) {
          await this.boardService.deleteCard(card.id)
        }
      }


    }
    await this.projectDoc.delete();
  }

  getFeatures(project: IProject): IFeatureDetail[] {
    if (!project.hasOwnProperty('features')) {
      return [];
    }
    const keys = Object.keys(project.features)
    let arr: IFeatureDetail [] = []
    keys.forEach(key => {
      arr.push(project.features[key])
    })
    return arr;
  }

}
