import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  columnsKeys = ['Feature','Starter','Professional','Business']

  featureComparison = [
    {
      name: 'tax savings',
      included: ['starter', 'professional', 'business']
    },
    {
      name: 'Easy to use accounting',
      included: ['Starter','Professional','Business']
    },
    {
      name: 'Multi-accounts',
      included: ['Starter','Professional','Business']
    },
    {
      name: 'Invoicing',
      included: ['Starter','Professional','Business']
    },
    {
      name: 'Mobile and web access',
      included: ['Starter','Professional','Business']
    }

  ]

  isMonthly: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  switchPlan() {
    this.isMonthly = !this.isMonthly;
  }

}
