import {Component, Input, OnInit} from '@angular/core';
import {IScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {ScrumboardDialogComponent} from './components/scrumboard-dialog/scrumboard-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {IScrumboard} from '../../../../../@webqube/models/scrumboard.interface';
import {FormControl} from '@angular/forms';
import {scrumboardUsers} from "../../../../../@webqube/static/scrumboard";
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import * as uuid from 'uuid';
import {IBoard} from "../../../../../@webqube/models/models";
import {map, tap} from "rxjs/operators";


@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {


  @Input() board: BehaviorSubject<IBoard>;

  static nextId = 100;


  addCardCtrl = new FormControl();
  addListCtrl = new FormControl();


  constructor(private dialog: MatDialog,
              private afs: AngularFirestore,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.board.pipe(map((value) => {
      if (!value) {
        return value
      }
      return this.afs.doc<IScrumboard>('boards/' + value.id).collection<IScrumboardList>('list')
        .valueChanges({idField: 'id'})
        .pipe(map((list)=>{
          return list
        }))
    })).subscribe(val => {
      console.log("lists: ", val)
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
    this.afs.doc<IScrumboard>('boards/' + this.board.value.id).update(this.board.value)
  }

}
