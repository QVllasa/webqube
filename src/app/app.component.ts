import {Component} from '@angular/core';
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {RegisterComponent} from "../@webqube/components/dialog/register/register.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webqube';
  constructor(private fns: AngularFireFunctions,public dialog: MatDialog) {
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
