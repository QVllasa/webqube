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
  constructor() {
  }

}
