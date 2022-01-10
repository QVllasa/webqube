import {Component, OnInit} from '@angular/core';
import {projects} from "../../../../@webqube/static/static";
import {ActivatedRoute} from "@angular/router";
import {IWork} from "../../../../@webqube/models/models";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit {

  projects = projects;
  project$ = new BehaviorSubject<IWork | undefined>(undefined);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.project$.next(this.projects.find(obj => obj.id ===  params.id+''))
    })

  }


}
