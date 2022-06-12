import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {filter, first} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boardColl: AngularFirestoreCollection<IBoard>;
  listColl: AngularFirestoreCollection<IScrumboardList>;
  cardColl: AngularFirestoreCollection<IScrumboardCard>;

  boards$: BehaviorSubject<(IBoard & { id: string; })[]> = new BehaviorSubject<(IBoard & { id: string })[]>(null);
  selectedBoard$: BehaviorSubject<(IBoard & { id: string; })> = new BehaviorSubject<(IBoard & { id: string })>(null);
  lists$: BehaviorSubject<IScrumboardList[]> = new BehaviorSubject<IScrumboardList[]>(null);


  constructor(private afs: AngularFirestore) {
  }

  createBoard(projectID: string): { card: IScrumboardCard, list: IScrumboardList[], board: IScrumboard } {
    this.setCollections(projectID);
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
        projectID: projectID,
        milestoneID: ''
      }
    }
  }

  async loadLists(boardID: string) {
    const lists = await this.afs.collection<IScrumboardList>('lists', ref => ref.where('boardID', '==', boardID))
      .valueChanges({idField: 'id'})
      .pipe(first())
      .toPromise();
    for await (const list of lists) {
      list.cards = await this.loadCards(list.id);
    }
    this.lists$.next(lists);
  }

  getList(id: string) {
    return this.listColl.doc(id)
  }

  async loadCards(listID: string): Promise<(IScrumboardCard & { id: string })[]> {
    return await this.afs.collection<IScrumboardCard>('cards', ref => ref.where('listID', '==', listID))
      .valueChanges({idField: 'id'})
      .pipe(first())
      .toPromise();
  }

  getCard(id: string) {
    return this.cardColl.doc(id);
  }

  getBoard(id: string) {
    return this.boardColl.doc(id);
  }

  setCollections(projectID: string) {
    this.cardColl = this.afs.collection<IScrumboardCard>('cards');
    this.listColl = this.afs.collection<IScrumboardList>('lists');
    this.boardColl = this.afs.collection<IBoard>('boards', ref => ref.where('projectID', '==', projectID))
  }

  async loadBoards() {
    const boards = await this.boardColl.valueChanges({idField: 'id'})
      .pipe(filter(boards => boards.length === 3), first())
      .toPromise();
    let selectedBoard = boards.find(obj => obj.selected);
    console.log("loaded boards", boards)
    if (!selectedBoard) {
      console.log("not selected loaded boards", boards)
      console.log("no board selected")
      selectedBoard = boards.find(obj => obj.order === 1)
      selectedBoard.selected = true;
      this.selectedBoard$.next(selectedBoard);
    }else {
      this.selectedBoard$.next(selectedBoard);
    }
    await this.loadLists(selectedBoard.id)
    this.boards$.next(boards);
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


}
