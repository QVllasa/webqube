import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";
import {filter, first, switchMap, take, tap} from "rxjs/operators";
import {RouteParamsService} from "./route-params.service";
import {BehaviorSubject, Observable} from "rxjs";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boardColl: AngularFirestoreCollection<IBoard>;
  listColl: AngularFirestoreCollection<IScrumboardList>;
  cardColl: AngularFirestoreCollection<IScrumboardCard>;

  boards$: BehaviorSubject<IBoard[]> = new BehaviorSubject<IBoard[]>(null);
  lists$: BehaviorSubject<IScrumboardList[]> = new BehaviorSubject<IScrumboardList[]>(null);

  constructor(private afs: AngularFirestore, private routeParamsService: RouteParamsService) {
    this.routeParamsService.routeParamsChange$
      .pipe(
        filter<Params>((params) => params['projectID']),
        switchMap((params: Params) => {
          this.setCollections(params['projectID']);
          return this.getBoards().pipe(tap(() => console.log("fetching boards")))
        })
      )
      .subscribe((boards) => {
        this.boards$.next(boards)
      });

  }

  initBoard(id: string): { card: IScrumboardCard, list: IScrumboardList[], board: IScrumboard } {
    this.setCollections(id);
    return {
      card: {
        title: "Erste Aufgabe",
        description: 'Some Description',
        link: '',
      },
      list: [
        {label: 'Geplant', order: 0},
        {label: 'In Bearbeitung', order: 1},
        {label: 'Erledigt', order: 2}
      ],
      board: {
        paid: false,
        selected: false,
        state: 'waiting',
        projectID: id,
        milestoneID: ''
      }
    }
  }

  getLists(boardID: string): Observable<(IScrumboardList & { id: string })[]> {
    return this.afs.collection<IScrumboardList>('lists', ref => ref.where('boardID', '==', boardID)).valueChanges({idField: 'id'})
  }

  getList(id: string) {
    return this.listColl.doc(id)
  }

  getCards(listID: string): Observable<(IScrumboardCard & { id: string })[]> {
    return this.afs.collection<IScrumboardCard>('cards', ref => ref.where('listID', '==', listID)).valueChanges({idField: 'id'})
  }

  getCard(id: string) {
    return this.afs.collection<IScrumboardCard>('cards').doc(id);
  }

  getBoard(id: string) {
    return this.boardColl.doc(id);
  }

  setCollections(projectID: string){
    this.cardColl = this.afs.collection<IScrumboardCard>('cards');
    this.listColl = this.afs.collection<IScrumboardList>('lists');
    this.boardColl = this.afs.collection<IBoard>('boards', ref => ref.where('projectID', '==', projectID))
  }

  getBoards() {
    return this.boardColl.valueChanges({idField: 'id'});
  }

  updateBoard(board: IBoard): Promise<void> {
    return this.boardColl.doc(board.id).update(board)
  }

  updateBoards(boards: IBoard[]): Promise<void> {
    let batch = this.afs.firestore.batch();
    boards.forEach(board => {
      const boardRef = this.boardColl.doc(board.id).ref;
      batch.set(boardRef, board)
    })
    return batch.commit();
  }


  // TODO change cardscoll and lists coll to getCards and getLists
  updateCard(card: IScrumboardCard): Promise<void> {
    return this.cardColl.doc(card.id).update(card)
  }

  createCard(card: IScrumboardCard): Promise<DocumentReference<IScrumboardCard>> {
    return this.cardColl.add(card)
  }

  async deleteList(id: string): Promise<void> {
    return await this.getList(id).delete();
  }

  async deleteCard(id: string): Promise<void> {
    return await this.getCard(id).delete();
  }

  async deleteBoard(id: string): Promise<void> {
    return await this.getBoard(id).delete();
  }


  async deleteLists(id: string): Promise<(IScrumboardList & { id: string })[]> {
    const lists = await this.getLists(id).pipe(first()).toPromise();
    for await (let list of lists) {
      await this.deleteList(list.id);
    }
    return lists
  }

  async deleteCards(id: string): Promise<(IScrumboardCard & { id: string })[]> {
    const cards = await this.getCards(id).pipe(first()).toPromise();
    for await (let card of cards) {
      await this.deleteCard(card.id);
    }
    return cards;
  }

  async deleteBoards(): Promise<(IBoard & { id: string })[]> {
    const boards = await this.getBoards().pipe(first()).toPromise();
    for await(let board of boards) {
      await this.deleteBoard(board.id);
    }
    return boards
  }
}
