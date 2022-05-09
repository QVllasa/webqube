import {Component, Input, OnInit} from '@angular/core';
import {IFeatureDetail} from "../../models/models";
import {AddFeatureComponent} from "../dialogs/add-feature/add-feature.component";
import {PlanService} from "../../services/plan.service";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-addon-listitem',
  templateUrl: './addon-listitem.component.html',
  styleUrls: ['./addon-listitem.component.css']
})
export class AddonListitemComponent implements OnInit {

  @Input() feature: IFeatureDetail ;
  showBenefits: boolean = false;

  constructor(private planService: PlanService, private dialog: MatDialog,) { }

  ngOnInit(): void {

  }

  addFeature() {
    this.dialog.open(AddFeatureComponent, {
      data: this.feature,
      width: 'auto',
      maxWidth: '100%',
      disableClose: false
    })
  }



  toggle() {
    this.showBenefits = !this.showBenefits;
  }
}
