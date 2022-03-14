import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IScrumboard} from "../models/scrumboard.interface";
import {IScrumboardList} from "../models/scrumboard-list.interface";
import {IScrumboardCard} from "../models/scrumboard-card.interface";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardColl: AngularFirestoreCollection<IScrumboard>;
  private listColl: AngularFirestoreCollection<IScrumboardList>;
  private cardColl: AngularFirestoreCollection<IScrumboardCard>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.pipe(
      tap(params => {
        const id = params['id'];
        this.boardColl = this.afs.collection('boards', ref => ref.where('projectID', '==', id));
        this.listColl = this.afs.collection('lists', ref => ref.where('projectID', '==', id))
        this.cardColl = this.afs.collection('cards', ref => ref.where('projectID', '==', id))
      })
    )
  }

  initBoard(id: string): {card: IScrumboardCard, list: IScrumboardList[], board: IScrumboard} {
    return {
      card:  {
        title: "Erste Aufgabe",
        description: 'Some Description'
      },
      list:  [
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

  // activateBoard(id: string, paid: boolean) {
  //   return this.scrumboardColl.doc(id).update({paid: paid})
  // }
}
