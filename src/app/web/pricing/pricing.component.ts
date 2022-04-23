import {Component, OnInit} from '@angular/core';
import {columnsKeys, faqs} from 'src/@webqube/static/static';
import {MatDialog} from "@angular/material/dialog";
import {
  IndividualRequestComponent
} from "../../../@webqube/components/dialogs/individual-request/individual-request.component";
import {RequestComponent} from "../../../@webqube/components/dialogs/request/request.component";
import {IFeatureDetail, IHosting, IPlan} from "../../../@webqube/models/models";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, tap} from "rxjs/operators";
import {PlanService} from "../../../@webqube/services/plan.service";

interface IRow {
  title: string,
  key: string
}


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {


  columnsKeys = columnsKeys

  showFeatures: boolean = false;
  // essentialFeatures = essentialFeatures;
  // starterFeatures = starterFeatures;
  // premiumFeatures = premiumFeatures;
  // unlimitedFeatures = unlimitedFeatures;

  plans: IPlan[] = [];
  hostings: IHosting[] = [];
  rows: IRow[] = [];
  faqs = faqs


  constructor(public dialog: MatDialog, private afs: AngularFirestore, private plansService: PlanService) {

    this.plansService.getPlans().then(plans => {
      this.plansService.plans$.next(plans.map(obj => ({...obj, selected: false})));
      const keys = Object.keys(plans[0].features)
      this.plans = plans;
      this.rows = [];
      keys.forEach(key=>{
        this.plans.forEach(plan => {
          if(!this.rows.some(e => e.key === key)){
            this.rows.push({title: plan.features[key].title, key: key})
          }
        })
      })
    })




    this.afs.collection<IHosting>('hostings').valueChanges({idField: 'id'})
      .pipe(
        map(hostings => {
          return hostings.sort((a, b) => {
            return a.order - b.order
          })
        })
      )
      .subscribe(hostings => {
        this.hostings = hostings;
      })
  }

  ngOnInit(): void {

  }


  openIndividualRequestDialog(): void {
    const dialogRef = this.dialog.open(IndividualRequestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRequestDialog(tier: IPlan): void {
    const dialogRef = this.dialog.open(RequestComponent, {data: tier});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getFeatureValue(plan: IPlan, row: IRow): IFeatureDetail {
    return plan.features[row.key];

  }

  checkType(value: boolean | string) {
    if (typeof value === "string") {
      return 'string'
    } else if (value === true) {
      return 'boolean'
    } else if (value === false) {
      return 'boolean'
    } else {
      return 'undefined'
    }
  }


}
