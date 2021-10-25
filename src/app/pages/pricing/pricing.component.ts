import {Component, OnInit} from '@angular/core';

interface IFeature{
  name: string,
  starter:boolean,
  professional: boolean,
  business: boolean,
  custom: boolean
  starterText?: string,
  professionalText?: string,
  businessText?: string
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  columnsKeys = ['Feature','Starter','Professional','Business']

  featureComparisonOneTime: IFeature[] = [
    {
      name: 'TAX savings',
      starter: true,
      professional: true,
      business: true,
      custom: false
    },
    {
      name: 'Easy to use accounting',
      starter: true,
      professional: true,
      business: true,
      custom: true,
      starterText: '3 Accounts',
      professionalText: '7 Accounts',
      businessText: '15 Accounts'
    },
    {
      name: 'Multi-accounts',
      starter: true,
      professional: true,
      business: true,
      custom: false,
    },
    {
      name: 'Invoicing',
      starter: true,
      professional: true,
      business: true,
      custom: false
    },
    {
      name: 'Mobile and web access',
      starter: true,
      professional: true,
      business: true,
      custom: false
    }
  ]

  featureComparisonMonthly: IFeature[] = [
    {
      name: 'TAX savings',
      starter: true,
      professional: true,
      business: true,
      custom: false
    },
    {
      name: 'Easy to use accounting',
      starter: true,
      professional: true,
      business: true,
      custom: true,
      starterText: '3 Accounts',
      professionalText: '10 Accounts',
      businessText: '15 Accounts'
    },
    {
      name: 'Multi-accounts',
      starter: true,
      professional: true,
      business: true,
      custom: false,
    },
    {
      name: 'Invoicing',
      starter: true,
      professional: true,
      business: true,
      custom: false
    },
    {
      name: 'Mobile and web access',
      starter: true,
      professional: true,
      business: true,
      custom: false
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
