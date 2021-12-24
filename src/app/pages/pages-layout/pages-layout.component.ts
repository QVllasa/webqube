import { Component, OnInit } from '@angular/core';
import {RegisterComponent} from "../../../@webqube/components/dialog/register/register.component";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.css']
})
export class PagesLayoutComponent implements OnInit {

  constructor(private fns: AngularFireFunctions,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  navigationItems = [
    {path: '/', label:''},
    {path:'our-work', label: 'Werke', badge:''},
    {path:'tech-blog', label: 'Tech-Blog', badge:'coming soon'},
    {path:'pricing', label: 'Preise', badge:''},
    {path:'about-us', label: 'Über Uns', badge:''}
  ]

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
