import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IScrumboardCard} from '../../../models/scrumboard-card.interface';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {IScrumboardList} from '../../../models/scrumboard-list.interface';
import {IBoard, IScrumboard} from '../../../models/scrumboard.interface';
import {ScrumboardAttachment} from '../../../models/scrumboard-attachment.interface';
import {DateTime} from 'luxon';
import {ScrumboardComment} from '../../../models/scrumboard-comment.interface';
import {filter, switchMap, take, tap} from "rxjs/operators";
import {ProjectService} from "../../../services/project.service";


@Component({
  selector: 'vex-scrumboard-dialog',
  templateUrl: './scrumboard-dialog.component.html',
  styleUrls: ['./scrumboard-dialog.component.scss']
})
export class ScrumboardDialogComponent implements OnInit {

  form = this.fb.group({
    title: '',
    description: '',
    link: '',
  });


  list: IScrumboardList;
  board: IScrumboard;
  card: IScrumboardCard;
  action: string;

  constructor(private dialogRef: MatDialogRef<ScrumboardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {
                card: IScrumboardCard;
                list: IScrumboardList;
                board: IScrumboard;
                action: string;
              },
              private projectService: ProjectService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.list = this.data.list;
    this.board = this.data.board;
    this.action = this.data.action;


    this.form.patchValue({
      title: this.data.card.title,
      description: this.data.card.description,
      link: this.data.card.link,
    });

    this.form.valueChanges.subscribe(value => {
      this.card = {
        link: value.link,
        description: value.description,
        listID: this.list.id,
        title: value.title,
        id: this.data.card.id
      }
    })

  }

  save() {
    this.dialogRef.close(this.card);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDeleteCard() {
    console.log(this.data.card)
    // this.projectService.updateProject(this.data.card)
    //   .then(() => {
    //     this.dialogRef.close()
    //   })
  }


}
