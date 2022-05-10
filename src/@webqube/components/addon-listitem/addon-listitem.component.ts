import {Component, Input, OnInit} from '@angular/core';
import {IFeatureDetail} from "../../models/models";
import {AddFeatureComponent} from "../dialogs/add-feature/add-feature.component";
import {PlanService} from "../../services/plan.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-addon-listitem',
  templateUrl: './addon-listitem.component.html',
  styleUrls: ['./addon-listitem.component.css']
})
export class AddonListitemComponent implements OnInit {

  @Input() feature: IFeatureDetail;
  showBenefits: boolean = false;
  counter = new FormControl()


  constructor(private planService: PlanService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.counter.setValue(1);
    this.counter.disable();
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

  plus() {
    this.counter.patchValue(this.counter.value + 1)
  }

  minus() {
    if(this.counter.value !== 1){
      this.counter.patchValue(this.counter.value - 1)
    }
  }


}
