import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../@webqube/components/dialog/register/register.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {




  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
