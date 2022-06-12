import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {IScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {
  ScrumboardDialogComponent
} from '../../../../../@webqube/components/dialogs/scrumboard-dialog/scrumboard-dialog.component';
import {ActivatedRoute, Params} from '@angular/router';
import {IBoard, IScrumboard} from '../../../../../@webqube/models/scrumboard.interface';
import {BehaviorSubject, combineLatest, forkJoin, Observable, of, Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {filter, first, map, switchMap, take, takeWhile, tap} from "rxjs/operators";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {sortByOrder} from "../../../../../@webqube/helper.functions";
import {PayMilstoneComponent} from "../../../../../@webqube/components/dialogs/pay-milstone/pay-milstone.component";
import {BoardService} from "../../../../../@webqube/services/board.service";
import {IProject} from "../../../../../@webqube/models/models";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit, OnDestroy {

  boards$: BehaviorSubject<(IBoard & { id: string; })[]>;
  selectedBoard: IScrumboard;
  lists$: BehaviorSubject<IScrumboardList[]>;
  project$: BehaviorSubject<IProject>;


  isLoading: boolean = false;


  constructor(private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private afs: AngularFirestore,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private boardService: BoardService,
  ) {

  }

  ngOnInit() {
    this.project$ = this.projectService.project$;
    this.boards$ = this.boardService.boards$;
    this.lists$ = this.boardService.lists$;
    this.boardService.selectedBoard$.subscribe(selectedBoard => {
      this.selectedBoard = selectedBoard;
    })


    this.isLoading = true;
    this.boardService.loadBoards().then(() => {
      this.isLoading = false;
    })
  }

  sortBoardsByOrder(data: IBoard[]): IBoard[] {
    return sortByOrder(data);
  }

  updateCard(board: IBoard, list: IScrumboardList, card: IScrumboardCard) {
    console.log('card in update card: ', card)
    this.cardDialog(card, list, 'update')
      .beforeClosed()
      .pipe(
        first(),
      )
      .toPromise()
      .then((value) => {
        if (value === 'success') {
          this._snackBar.open('Aufgabe aktualisiert.', '',
            {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['bg-green-500', 'text-white']
            });
          return this.boardService.loadLists(this.selectedBoard.id)
        } else {
          return value;
        }
      }).then()
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


  //TODO as Promise
  createCard(list: IScrumboardList) {
    let card: IScrumboardCard = {
      title: '',
      description: '',
      listID: list.id,
      link: '',
      id: ''
    }

    this.cardDialog(card, list, 'create').afterClosed()
      .pipe(first())
      .toPromise()
      .then((value) => {
        if (value === 'success') {
          this._snackBar.open('Aufgabe erstellt.', '',
            {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['bg-green-500', 'text-white']
            });
          return this.boardService.loadLists(this.selectedBoard.id)
        } else {
          return value;
        }
      })

  }

  cardDialog(card: IScrumboardCard, list: IScrumboardList, action: 'create' | 'update') {
    return this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, action},
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    })
  }


  payMilestone(board: IBoard) {
    this.dialog.open(PayMilstoneComponent, {
      data: board,
      width: 'auto',
      maxWidth: '100%',
      disableClose: false
    })
  }


  onSelectBoard(board: IBoard, boards: IBoard[]) {
    boards.map((item, index) => {
      if (item.id === board.id) {
        item.selected = !item.selected;
      } else {
        item.selected = false;
      }
    })

    this.boardService.updateBoards(boards).then(() => {
      this.isLoading = true;
      return this.boardService.loadBoards()
    }).then(() => {
      this.isLoading = false;
    });
  }


  sortListsByOrder(obj: IScrumboardList[]): IScrumboardList[] {
    return obj.sort((a, b) => (a.order < b.order ? -1 : 1))
  }

  showHelp() {
    console.log('asd')
  }


  ngOnDestroy() {

  }

}
