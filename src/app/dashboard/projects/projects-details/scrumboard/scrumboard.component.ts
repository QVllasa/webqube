import {Component, Input, OnInit} from '@angular/core';
import {IScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {
  ScrumboardDialogComponent
} from '../../../../../@webqube/components/dialogs/scrumboard-dialog/scrumboard-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {IBoard, IScrumboard} from '../../../../../@webqube/models/scrumboard.interface';
import {of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {filter, map, mergeMap, switchMap, take} from "rxjs/operators";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {sortByOrder} from "../../../../../@webqube/helper.functions";
import {PayMilstoneComponent} from "../../../../../@webqube/components/dialogs/pay-milstone/pay-milstone.component";


@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {

  @Input() board: IBoard = null;
  boardID: string;
  id: string;


  constructor(private dialog: MatDialog,
              private afs: AngularFirestore,
              private projectService: ProjectService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {}

  sortByOrder(data: any[]): IScrumboardList[] {
    return sortByOrder(data);
  }

  updateCard(board: IScrumboard, list: IScrumboardList, card: IScrumboardCard) {
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
      this.projectService.updateProject(card).then()
    }
  }


  getConnectedList(board: IScrumboard) {
    return board.list.map(x => `${x.id}`);
  }

  createCard(list: IScrumboardList, board: IScrumboard) {
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
          return of(this.projectService.updateProject(value))
        })
      )
      .subscribe();
  }

  cardDialog(card: IScrumboardCard, list: IScrumboardList, board: IScrumboard, action: 'create' | 'update' | 'delete') {
    return this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board, action},
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    })
  }


  payMilestone() {
    this.dialog.open(PayMilstoneComponent, {
      data: this.board,
      width: 'auto',
      maxWidth: '100%',
      disableClose: false
    })
  }
}
