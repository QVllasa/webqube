import { Component, OnInit } from '@angular/core';
import {IFeatureDetail} from "../../../../../@webqube/models/models";

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle(feature: { key: string, value: IFeatureDetail }) {
    // switch (feature.value.valueType) {
    //   case 'boolean': {
    //     //TODO add Paypal
    //     feature.value.value = true;
    //     this.project.features[feature.key] = feature.value;
    //     this.projectService.updateProject(this.project).then((res) => {
    //       console.log('update successful', res)
    //       this.projectService.project$.next(this.project)
    //     })
    //     break;
    //   }
    //   case 'number': {
    //     console.log('do something')
    //   }
    // }
  }

  // get features(): { key: string, value: IFeatureDetail }[] {
  //   // const keys = Object.keys(this.project.features)
  //   // let arr: { key: string, value: IFeatureDetail }[] = []
  //   // keys.forEach(key => {
  //   //   arr.push({key: key, value: this.project.features[key]})
  //   // })
  //   // return arr;
  // }

}
