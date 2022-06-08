import {Component, OnInit} from '@angular/core';
import {IFeatureDetail, IProject} from "../../../../../@webqube/models/models";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {PlanService} from "../../../../../@webqube/services/plan.service";
import {MatDialog} from "@angular/material/dialog";
import {PayMilstoneComponent} from "../../../../../@webqube/components/dialogs/pay-milstone/pay-milstone.component";
import {AddFeatureComponent} from "../../../../../@webqube/components/dialogs/add-feature/add-feature.component";
import {filter} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent implements OnInit {

  project: IProject;

  features: IFeatureDetail [] = [];


  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.project$
      .pipe(filter(project => project !== null))
      .subscribe((project) => {
        this.project = project;
        this.features = this.projectService.getFeatures(project);
      })
  }


}
