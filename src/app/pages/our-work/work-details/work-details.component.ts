import { Component, OnInit } from '@angular/core';
import {projects} from "../../../../@webqube/static";
import {ActivatedRoute} from "@angular/router";
import {IProject} from "../../../../@webqube/models";

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit {

  projects = projects;
  project: IProject | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.project = this.projects.find(obj => obj.id === this.route.snapshot.paramMap.get('id'))
  }

}
