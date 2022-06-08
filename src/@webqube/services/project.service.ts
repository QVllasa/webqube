import {Injectable} from '@angular/core';
import {IBoard} from "../models/scrumboard.interface";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject} from "rxjs";
import {IPlan, IProject} from "../models/models";
import {first, tap} from "rxjs/operators";
import {MilestoneService} from "./milestone.service";
import {BoardService} from "./board.service";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public project$ = new BehaviorSubject<IProject>(null);

  private projectDoc: AngularFirestoreDocument<IProject>;


  constructor(private afs: AngularFirestore,
              private milestoneService: MilestoneService,
              private boardSerivce: BoardService) {


  }

  async initProject(plan: IPlan, projectID: string) {

    const defaultBoard = this.boardSerivce.createBoard(projectID);

    for await (const milestone of this.milestoneService.milestones.value) {
      const board: IBoard = {...defaultBoard['board'], ...milestone, milestoneID: milestone.id}
      console.log("board ", board)
      await this.boardSerivce.boardColl.add(board)
    }

    let boardRefs = await this.boardSerivce.boardColl.valueChanges({idField: 'id'}).pipe(first()).toPromise();
    for (const boardRef of boardRefs) {
      for await (const list of defaultBoard['list']) {
        const listRef = await this.boardSerivce.listColl.add({...list, boardID: boardRef.id})
        await this.boardSerivce.cardColl.add({
          ...defaultBoard['card'],
          listID: listRef.id
        })
      }
    }


    await this.projectDoc.update({planID: plan.id, features: plan.features});
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


  getProject(id: string) {
    this.projectDoc = this.afs.collection<IProject>('projects').doc(id);
    return this.projectDoc.valueChanges({idField: 'id'}).pipe(
      tap((project) => {
        this.project$.next(project)
      })
    )
  }

  async deleteProject(projectID: string) {
    const boards = await this.afs.collection('boards', ref => ref.where('projectID', '==', projectID)).valueChanges({idField: 'id'}).pipe(first()).toPromise()
    for await (let board of boards) {
      await this.boardSerivce.deleteBoard(board.id);
      const lists = await this.afs.collection<IScrumboardList>('lists', ref => ref.where('boardID', '==', board.id)).valueChanges({idField: 'id'}).pipe(first()).toPromise()
      for await(const list of lists) {
        await this.boardSerivce.deleteList(list.id);
        const cards = await this.afs.collection<IScrumboardCard>('cards', ref => ref.where('listID', '==', list.id)).valueChanges({idField: 'id'}).pipe(first()).toPromise()
        for await (let card of cards) {
          await this.boardSerivce.deleteCard(card.id)
        }
      }


    }
    await this.projectDoc.delete();
  }

}
