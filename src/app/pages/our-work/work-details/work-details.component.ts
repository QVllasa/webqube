import {Component, OnInit} from '@angular/core';
import {projects} from "../../../../@webqube/static";
import {ActivatedRoute} from "@angular/router";
import {IProject} from "../../../../@webqube/models";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit {

  projects = projects;
  project$ = new BehaviorSubject<IProject | undefined>(undefined);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.project$.next(this.projects.find(obj => obj.id ===  params.id+''))
    })

  }


}
