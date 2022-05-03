import {Component, OnInit} from '@angular/core';
import {IFeatureDetail, IProject} from "../../../../../@webqube/models/models";
import {ProjectService} from "../../../../../@webqube/services/project.service";
import {PlanService} from "../../../../../@webqube/services/plan.service";
import {MatDialog} from "@angular/material/dialog";
import {PayMilstoneComponent} from "../../../../../@webqube/components/dialogs/pay-milstone/pay-milstone.component";
import {AddFeatureComponent} from "../../../../../@webqube/components/dialogs/add-feature/add-feature.component";

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent implements OnInit {

  project: IProject;

  constructor(private projectService: ProjectService, private planService: PlanService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.projectService.project$
      .subscribe(project => {
        this.project = project;
        console.log("asdasd", this.project)
      })
  }

  toggle(feature: { key: string, value: IFeatureDetail }) {
    switch (feature.value.valueType) {
      case 'boolean': {
        //TODO add Paypal
        feature.value.value = true;
        this.project.features[feature.key] = feature.value;
        this.projectService.updateProject(this.project).then((res) => {
          console.log('update successful', res)
          this.projectService.project$.next(this.project)
        })
        break;
      }
      case 'number': {
        console.log('do something')
      }
    }
  }

  get features(): { key: string, value: IFeatureDetail }[] {
    const keys = Object.keys(this.project.features)
    let arr: { key: string, value: IFeatureDetail }[] = []
    keys.forEach(key => {
      arr.push({key: key, value: this.project.features[key]})
    })
    return arr;
  }

  addFeature(feature: { key: string, value: IFeatureDetail }) {
    this.dialog.open(AddFeatureComponent, {
      data: feature,
      width: 'auto',
      maxWidth: '100%',
      disableClose: false
    })
  }

  activateFeature(feature: { key: string, value: IFeatureDetail }) {
    this.dialog.open(AddFeatureComponent, {
      data: feature,
      width: 'auto',
      maxWidth: '100%',
      disableClose: false
    })
  }

}
