import {Component} from '@angular/core';
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {RegisterComponent} from "../@webqube/components/dialogs/register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectService} from "../@webqube/services/project.service";

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
