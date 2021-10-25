import {Component, OnInit} from '@angular/core';
import {columnsKeys, faqs, featureComparison, priceCards} from 'src/@webqube/static';



@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {


  columnsKeys = columnsKeys
  featureComparison = featureComparison
  priceCards = priceCards;
  faqs = faqs

  isMonthly: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  switchPlan() {
    this.isMonthly = !this.isMonthly;
  }

}
