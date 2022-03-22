import {Component, Input, OnInit} from '@angular/core';
import {IScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {
  ScrumboardDialogComponent
} from '../../../../../@webqube/components/dialogs/scrumboard-dialog/scrumboard-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {IBoard} from '../../../../../@webqube/models/scrumboard.interface';
import {BehaviorSubject, combineLatest, forkJoin, Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {filter, switchMap, take, takeWhile, tap} from "rxjs/operators";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {sortByOrder} from "../../../../../@webqube/helper.functions";
import {PayMilstoneComponent} from "../../../../../@webqube/components/dialogs/pay-milstone/pay-milstone.component";
import {BoardService} from "../../../../../@webqube/services/board.service";


@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {

  @Input() board$: BehaviorSubject<IBoard> = null;
  @Input() lists$: BehaviorSubject<IScrumboardList[]> = null;


  constructor(private dialog: MatDialog,
              private afs: AngularFirestore,
              private projectService: ProjectService,
              private boardService: BoardService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lists$
      .pipe(
        filter<IScrumboardList[]>(Boolean),
        switchMap((lists) => {
          const listIDs = lists.map(obj => obj.id);
          let cardsObs: Observable<(IScrumboardCard & { id: string })[]>[] = [];
          listIDs.forEach(listID => {
            cardsObs.push(this.boardService.getCards(listID))
          })
          return combineLatest(cardsObs)
        })
      )
      .subscribe(
        (cards) => {
          let cardsList: (IScrumboardCard & { id: string; })[] = []
          cards.forEach((card) => {
            cardsList = [...cardsList, ...card]
          })
          this.lists$.value.forEach((list) => {
            list.cards = cardsList.filter(obj => obj.listID === list.id)
          })
        },
      )

  }

  sortByOrder(data: IScrumboardList[]): IScrumboardList[] {
    return sortByOrder(data);
  }

  updateCard(board: IBoard, list: IScrumboardList, card: IScrumboardCard) {
    console.log('card in update card: ', card)
    this.cardDialog(card, list, 'update')
      .beforeClosed()
      .pipe(
        take(1),
        filter(value => value && (value !== card)),
        switchMap((value) => {
          return this.boardService.updateCard(value)
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
      let card: IScrumboardCard = {...event.item.data, listID: event.container.id}
      this.boardService.updateCard(card).then()
    }
  }


  getConnectedList(list: IScrumboardList[]) {
    return list.map(x => `${x.id}`);
  }

  createCard(list: IScrumboardList) {
    let card: IScrumboardCard = {
      title: '',
      description: '',
      listID: list.id,
      link: '',
      id: ''
    }

    this.cardDialog(card, list, 'create').afterClosed()
      .pipe(
        take(1),
        filter(value => value && (value !== card)),
        switchMap((value: IScrumboardCard) => {
          return of(this.boardService.createCard(value))
        })
      )
      .subscribe();
  }

  cardDialog(card: IScrumboardCard, list: IScrumboardList, action: 'create' | 'update' | 'delete') {
    return this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, action},
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    })
  }


  payMilestone() {
    this.dialog.open(PayMilstoneComponent, {
      data: this.board$,
      width: 'auto',
      maxWidth: '100%',
      disableClose: false
    })
  }
}
