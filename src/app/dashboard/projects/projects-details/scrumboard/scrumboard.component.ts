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
import {filter, switchMap, take, tap} from "rxjs/operators";
import {IProject} from "../../../../../@webqube/models/models";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {sortByOrder} from "../../../../../@webqube/helper.functions";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {PayMilstoneComponent} from "../../../../../@webqube/components/dialog/pay-milstone/pay-milstone.component";


@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {



  @Input() board$: BehaviorSubject<IBoard>;

  board: IBoard;
  id: string;


  constructor(private dialog: MatDialog,
              private afs: AngularFirestore,
              private projectService: ProjectService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    console.log("id", this.id)
    this.board$.subscribe(board => {
      this.board = board;
    })
  }

  sortByOrder(data: any[]) {
    return sortByOrder(data);
  }

  updateCard(board: IBoard, list: IScrumboardList, card: IScrumboardCard) {
    console.log('card in update card: ', card)
    this.cardDialog(card, list, board, 'update')
      .beforeClosed()
      .pipe(
        take(1),
        filter(value => value && (value !== card)),
        switchMap((value) => {
          return this.projectService.updateCard(value)
        })
      )
      .subscribe();
  }


  drop(event: CdkDragDrop<IScrumboardCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let card: IScrumboardCard = {...event.item.data, scrumboardListID: event.container.id}
      this.projectService.updateCard(card).then()
    }
  }


  getConnectedList(board: IBoard) {
    return board.list.map(x => `${x.id}`);
  }

  createCard(list: IScrumboardList, board: IBoard) {
    let card: IScrumboardCard = {
      title: '',
      description: '',
      projectID: board.projectID,
      scrumboardID: board.id,
      scrumboardListID: list.id,
      link: '',
      id: ''
    }

    this.cardDialog(card, list, board, 'create').afterClosed()
      .pipe(
        take(1),
        filter(value => value && (value !== card)),
        switchMap((value: IScrumboardCard) => {
          return of(this.projectService.createCard(value))
        })
      )
      .subscribe();
  }

  cardDialog(card: IScrumboardCard, list: IScrumboardList, board: IBoard, action: 'create' | 'update' | 'delete') {
    return this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board, action},
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    })
  }




  payMilestone() {
    this.dialog.open(PayMilstoneComponent,{
      data:{},
      width:'auto',
      maxWidth:'100%',
      disableClose:false
    })
  }
}
