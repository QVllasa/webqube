import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ScrumboardList} from '../../../../../@webqube/models/scrumboard-list.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ScrumboardCard} from '../../../../../@webqube/models/scrumboard-card.interface';
import {MatDialog} from '@angular/material/dialog';
import {ScrumboardDialogComponent} from './components/scrumboard-dialog/scrumboard-dialog.component';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {IScrumboard} from '../../../../../@webqube/models/scrumboard.interface';
import {FormControl} from '@angular/forms';
import {scrumboard, scrumboardUsers} from "../../../../../@webqube/static/scrumboard";


@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {

  @Input() boardTitle: string;
  @Input() board: IScrumboard;

  static nextId = 100;




  addCardCtrl = new FormControl();
  addListCtrl = new FormControl();

  scrumboardUsers = scrumboardUsers;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  open(board: IScrumboard, list: ScrumboardList, card: ScrumboardCard) {
    this.addCardCtrl.setValue(null);

    this.dialog.open(ScrumboardDialogComponent, {
      data: {card, list, board},
      width: '700px',
      maxWidth: '100%',
      disableClose: true
    }).beforeClosed().pipe(
      filter<ScrumboardCard>(Boolean)
    ).subscribe(value => {
      console.log(value);
      const index = list.children.findIndex(child => child.id === card.id);
      if (index > -1) {
        list.children[index] = value;
      }
    });
  }

  drop(event: CdkDragDrop<ScrumboardCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropList(event: CdkDragDrop<ScrumboardList[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(board: IScrumboard) {
    return board.children.map(x => `${x.id}`);
  }

  openAddCard(list: ScrumboardList, content: TemplateRef<any>, origin: HTMLElement) {
    // this.popover.open({
    //   content,
    //   origin,
    //   position: [
    //     {
    //       originX: 'center',
    //       originY: 'bottom',
    //       overlayX: 'center',
    //       overlayY: 'bottom'
    //     },
    //     {
    //       originX: 'center',
    //       originY: 'bottom',
    //       overlayX: 'center',
    //       overlayY: 'top',
    //     },
    //   ]
    // });
  }

  openAddList(board: IScrumboard, content: TemplateRef<any>, origin: HTMLElement) {
    // this.popover.open({
    //   content,
    //   origin,
    //   position: [
    //     {
    //       originX: 'center',
    //       originY: 'bottom',
    //       overlayX: 'center',
    //       overlayY: 'top'
    //     },
    //     {
    //       originX: 'center',
    //       originY: 'bottom',
    //       overlayX: 'center',
    //       overlayY: 'top',
    //     },
    //   ]
    // });
  }

  createCard(list: ScrumboardList, close: () => void) {
    if (!this.addCardCtrl.value) {
      return;
    }

    list.children.push({
      id: ScrumboardComponent.nextId++,
      title: this.addCardCtrl.value
    });

    close();

    this.addCardCtrl.setValue(null);
  }

  createList(board: IScrumboard, close: () => void) {
    if (!this.addListCtrl.value) {
      return;
    }

    board.children.push({
      id: ScrumboardComponent.nextId++,
      label: this.addListCtrl.value,
      children: []
    });

    close();

    this.addListCtrl.setValue(null);
  }

  toggleStar(board: IScrumboard) {
    board.starred = !board.starred;
  }
}
