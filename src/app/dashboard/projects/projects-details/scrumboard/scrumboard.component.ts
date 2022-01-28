import {Component, Input, OnInit} from '@angular/core';
import {IScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {ScrumboardDialogComponent} from './components/scrumboard-dialog/scrumboard-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {IBoard, IScrumboard} from '../../../../../@webqube/models/scrumboard.interface';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, of} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import * as uuid from 'uuid';

import firebase from "firebase/compat";
import {switchMap} from "rxjs/operators";
import {IProject} from "../../../../../@webqube/models/models";


@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {


  @Input() board$: BehaviorSubject<IBoard>;

  board: IBoard;


  private listColl: AngularFirestoreCollection<IScrumboardList>;


  id: string;


  addCardCtrl = new FormControl();
  addListCtrl = new FormControl();


  constructor(private dialog: MatDialog,
              private afs: AngularFirestore,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("id", this.id)
    this.board$
      .pipe(
        switchMap((board)=>{
          if (!board){
            return of(null);
          }
          this.board = board;
          return this.afs
            .doc<IProject>('projects/' + this.id)
            .collection<IScrumboard>('boards')
            .doc<IScrumboard>(this.board.id)
            .collection<IScrumboardList>('lists')
            .valueChanges({idField: 'id'})
        })
      )
      .subscribe((value)=>{
        this.board = {...this.board, list: value}
      })

  }

  openCard(board: IScrumboard, list: IScrumboardList, card: IScrumboardCard) {
    this.addCardCtrl.setValue(null);

    this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board},
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    }).beforeClosed()
      .subscribe((value: { data: IScrumboardCard, action: string }) => {
        console.log(value)
        if (!value) {
          return;
        }
        switch (value.action) {
          case 'add': {
            const index = list.cards.findIndex(child => child.id === card.id);
            if (index > -1) {
              list.cards[index] = value.data;
            }
            this.update();
            break;
          }
          case 'remove': {
            const index = list.cards.findIndex(child => child.id === card.id);
            if (index > -1) {
              list.cards.splice(index, 1);
            }
            this.update();
            break;
          }
        }
      });
  }

  drop(event: CdkDragDrop<IScrumboardCard[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.update();
    }
  }

  getConnectedList(board: IScrumboard) {
    return board.list.map(x => `${x.id}`);
  }

  addCard(list: IScrumboardList, board: IScrumboard) {
    let card: IScrumboardCard = {id: uuid.v4(), title: 'Neue Aufgabe', description: ''}
    let action = 'add';
    this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board, action},
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    }).afterClosed()
      .subscribe(value => {
        if (!value) {
          return;
        }
        if (value === card) {
          console.log("no changes", value);
        } else {
          list.cards.push(value);
          this.update();
        }

      });
  }

  update() {
    this.afs.doc<IScrumboard>('boards/' + this.board$.value.id).update(this.board$.value)
  }

}
