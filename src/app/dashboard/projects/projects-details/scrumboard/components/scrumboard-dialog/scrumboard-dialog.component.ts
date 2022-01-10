import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ScrumboardCard} from '../../../../../../../@webqube/models/scrumboard-card.interface';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ScrumboardList} from '../../../../../../../@webqube/models/scrumboard-list.interface';
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
    dueDate: null,
    cover: null,
    attachments: this.fb.array([]),
    comments: this.fb.array([]),
    users: [],
    labels: []
  });

  commentCtrl = new FormControl();



  // users = scrumboardUsers;
  // labels = scrumboardLabels;

  list: ScrumboardList;
  board: IScrumboard;

  constructor(private dialogRef: MatDialogRef<ScrumboardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {
                card: ScrumboardCard;
                list: ScrumboardList;
                board: IScrumboard;
              },
              private fb: FormBuilder) { }

  ngOnInit() {
    this.list = this.data.list;
    this.board = this.data.board;

    const card = this.data.card;

    this.form.valueChanges.subscribe(console.log);

    this.form.patchValue({
      title: card.title,
      description: card.description,
      dueDate: card.dueDate || null,
      cover: card.cover || null,
      users: card.users || [],
      labels: card.labels || []
    });

    this.form.setControl('attachments', this.fb.array(card.attachments || []));
    this.form.setControl('comments', this.fb.array(card.comments || []));
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  addComment() {
    if (!this.commentCtrl.value) {
      return;
    }

    const comments = this.form.get('comments') as FormArray;
    comments.push(new FormControl({
      from: {
        name: 'David Smith',
        imageSrc: 'assets/img/avatars/1.jpg'
      },
      message: this.commentCtrl.value,
      date: DateTime.local().minus({ seconds: 1 })
    } as ScrumboardComment));

    this.commentCtrl.setValue(null);
  }
}
