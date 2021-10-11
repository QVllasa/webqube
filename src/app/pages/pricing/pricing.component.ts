import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  isMonthly: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  switchPlan(){
    this.isMonthly = !this.isMonthly;
  }

}
