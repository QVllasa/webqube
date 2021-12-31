import {Component, OnInit} from '@angular/core';
import {columnsKeys, faqs, featureComparison, Tiers} from 'src/@webqube/static';
import {RegisterComponent} from "../../../@webqube/components/dialog/register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {IndividualRequestComponent} from "../../../@webqube/components/dialog/individual-request/individual-request.component";
import {RequestComponent} from "../../../@webqube/components/dialog/request/request.component";
import {ITier} from "../../../@webqube/models";



@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {


  columnsKeys = columnsKeys
  featureComparison = featureComparison
  priceCards = Tiers;
  faqs = faqs

  isMonthly: boolean = true;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  switchPlan() {
    this.isMonthly = !this.isMonthly;
  }


  openIndividualRequestDialog(): void {
    const dialogRef = this.dialog.open(IndividualRequestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRequestDialog(priceCard: ITier): void {
    const dialogRef = this.dialog.open(RequestComponent, {data: priceCard});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
