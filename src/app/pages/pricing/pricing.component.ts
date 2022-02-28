import {Component, OnInit} from '@angular/core';
import {
  columnsKeys,
  essentialFeatures,
  faqs,
  premiumFeatures,
  starterFeatures,
  unlimitedFeatures
} from 'src/@webqube/static/static';
import {MatDialog} from "@angular/material/dialog";
import {
  IndividualRequestComponent
} from "../../../@webqube/components/dialogs/individual-request/individual-request.component";
import {RequestComponent} from "../../../@webqube/components/dialogs/request/request.component";
import {IFeature, IFeatureDetail, IMilestone, ITier} from "../../../@webqube/models/models";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, tap} from "rxjs/operators";

interface IRow {
  title: string,
  key: string
}


//TODO add feature values

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {


  columnsKeys = columnsKeys

  showFeatures: boolean = false;
  essentialFeatures = essentialFeatures;
  starterFeatures = starterFeatures;
  premiumFeatures = premiumFeatures;
  unlimitedFeatures = unlimitedFeatures;

  tiers: ITier[] = [];
  rows: IRow[] = [];
  faqs = faqs


  constructor(public dialog: MatDialog, private afs: AngularFirestore) {

    this.afs.collection<ITier>('tiers').valueChanges({idField: 'id'})
      .pipe(
        //sort
        map(tiers => {
          return tiers.sort((a, b) => {
            return a.order - b.order;
          });
        }),
      //get keys for rows
        tap(tiers => {
        this.rows = [];
        if (tiers[0]) {
          tiers[0].allFeatures.forEach((obj) => {
            this.rows.push({title: obj[Object.keys(obj)[0]].title, key: Object.keys(obj)[0]})
          })
        }
      }))
      .subscribe(tiers => {
        this.tiers = tiers;
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

  openRequestDialog(tier: ITier): void {
    const dialogRef = this.dialog.open(RequestComponent, {data: tier});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getFeatureValue(tier: ITier, row: IRow): string | boolean {
    console.log("obj: ", tier.allFeatures.find(obj => Object.keys(obj)[0] === row.key)[row.key].value)
    return tier.allFeatures.find(obj => Object.keys(obj)[0] === row.key)[row.key].value
  }

  checkType(value: boolean | string) {
    return typeof value === "boolean"
  }


}
