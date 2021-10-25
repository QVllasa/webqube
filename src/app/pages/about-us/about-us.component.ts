import { Component, OnInit } from '@angular/core';
import {team} from "../../../@webqube/static";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  team = team;

  constructor() { }

  ngOnInit(): void {
  }

}
