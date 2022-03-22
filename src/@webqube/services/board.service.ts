import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IBoard, IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";
import {filter, first, switchMap, tap} from "rxjs/operators";
import {RouteParamsService} from "./route-params.service";
import {BehaviorSubject} from "rxjs";

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
        tap((params: Params) => {
          this.initCollections(params['projectID'])
        }),
        switchMap((params: Params) => {
          return this.boardColl.valueChanges({idField: 'id'}).pipe(tap(() => console.log("fetching boards")))
          //TODO add lists
          //TODO add cards
        })
      )
      .subscribe((boards) => {
        this.boards$.next(boards)
      });


  }

  initBoard(id: string): { card: IScrumboardCard, list: IScrumboardList[], board: IScrumboard } {
    return {
      card: {
        title: "Erste Aufgabe",
        description: 'Some Description',
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
      }
    }
  }

  initCollections(id: string) {
    this.boardColl = this.afs.collection('boards', ref => ref.where('projectID', '==', id));
    this.listColl = this.afs.collection('lists', ref => ref.where('projectID', '==', id))
    this.cardColl = this.afs.collection('cards', ref => ref.where('projectID', '==', id))
  }

  updateBoard(board: IBoard): Promise<void> {
    return this.boardColl.doc(board.id).update(board)
  }

  updateBoards(boards: IBoard[]): Promise<void>{
    let batch = this.afs.firestore.batch();
    boards.forEach(board => {
      const boardRef = this.boardColl.doc(board.id).ref;
      batch.set(boardRef, board)
    })
    return batch.commit();
  }

  // activateBoard(id: string, paid: boolean) {
  //   return this.scrumboardColl.doc(id).update({paid: paid})
  // }
}
