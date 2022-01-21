import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IScrumboardCard} from '../../../../../../../@webqube/models/scrumboard-card.interface';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {IScrumboardList} from '../../../../../../../@webqube/models/scrumboard-list.interface';
import {IScrumboard} from '../../../../../../../@webqube/models/scrumboard.interface';
import {ScrumboardAttachment} from '../../../../../../../@webqube/models/scrumboard-attachment.interface';
import {DateTime} from 'luxon';
import {ScrumboardComment} from '../../../../../../../@webqube/models/scrumboard-comment.interface';


@Component({
  selector: 'vex-scrumboard-dialog',
  templateUrl: './scrumboard-dialog.component.html',
  styleUrls: ['./scrumboard-dialog.component.scss']
})
export class ScrumboardDialogComponent implements OnInit {

  form = this.fb.group({
    title: null,
    description: null,
    link: null,
  });



  list: IScrumboardList;
  board: IScrumboard;

  constructor(private dialogRef: MatDialogRef<ScrumboardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {
                card: IScrumboardCard;
                list: IScrumboardList;
                board: IScrumboard;
              },
              private fb: FormBuilder) { }

  ngOnInit() {
    this.list = this.data.list;
    this.board = this.data.board;
    const card = this.data.card;

    this.form.patchValue({
      title: card.title,
      description: card.description,
      link: card.link,
    });

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  onCancel(){
    this.dialogRef.close();
  }

}
