import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {IScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {ScrumboardDialogComponent} from './components/scrumboard-dialog/scrumboard-dialog.component';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {IScrumboard} from '../../../../../@webqube/models/scrumboard.interface';
import {FormControl} from '@angular/forms';
import {scrumboard, scrumboardUsers} from "../../../../../@webqube/static/scrumboard";
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import * as uuid from 'uuid';


@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {


  @Input() board: BehaviorSubject<IScrumboard>;

  static nextId = 100;


  addCardCtrl = new FormControl();
  addListCtrl = new FormControl();

  scrumboardUsers = scrumboardUsers;

  constructor(private dialog: MatDialog,
              private afs: AngularFirestore,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  open(board: IScrumboard, list: IScrumboardList, card: IScrumboardCard) {
    this.addCardCtrl.setValue(null);

    this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board},
      width: '400px',
      maxWidth: '100%',
      disableClose: false
    }).beforeClosed()
      .subscribe(value => {
        if (!value){
          return;
        }
        const index = list.children.findIndex(child => child.id === card.id);
        if (index > -1) {
          list.children[index] = value;
        }
        this.update();

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
    return board.children.map(x => `${x.id}`);
  }

  openAddCard(list: IScrumboardList, board: IScrumboard) {
    console.log(list, board)
    let card: IScrumboardCard = {id: uuid.v4(), title: 'Neue Aufgabe', description: ''}
    this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board},
      width: '400px',
      maxWidth: '100%',
      disableClose: false
    }).afterClosed()
      .subscribe(value => {
        console.log("no changes",value);
        if(value === card){
          console.log("no changes",value);
        }else {
          list.children.push(value);
          this.update();
        }

    });
  }

  update(){
    this.afs.doc<IScrumboard>('boards/' + this.board.value.id).update(this.board.value)
  }

}
