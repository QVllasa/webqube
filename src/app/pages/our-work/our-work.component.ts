import { Component, OnInit } from '@angular/core';
import {IProject} from "../../../@webqube/models";
import {projects} from "../../../@webqube/static";

@Component({
  selector: 'app-galery',
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.css']
})
export class OurWorkComponent implements OnInit {
  projects = projects;
  featuredProject = projects.find(obj => obj.featured)

  constructor() { }

  ngOnInit(): void {
  }

}
