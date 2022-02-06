import { Component, OnInit } from '@angular/core';
import {RegisterComponent} from "../../../@webqube/components/dialogs/register/register.component";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {MatDialog} from "@angular/material/dialog";
import {AuthComponent} from "../../../@webqube/components/dialogs/auth/auth.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.css']
})
export class PagesLayoutComponent implements OnInit {

  constructor(private fns: AngularFireFunctions,public dialog: MatDialog, public auth: AngularFireAuth) { }

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

  onLogin() {
    const dialogRef = this.dialog.open(AuthComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
