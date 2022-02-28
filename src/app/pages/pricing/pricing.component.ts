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
import {IFeature, IMilestone, ITier} from "../../../@webqube/models/models";
import {AngularFirestore} from "@angular/fire/compat/firestore";


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
  rows: string[] = [];
  faqs = faqs


  constructor(public dialog: MatDialog, private afs: AngularFirestore) {

    this.afs.collection<ITier>('tiers').valueChanges({idField: 'id'}).subscribe(tiers => {
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

  // getFeatureValue(tier: ITier, row: string){
  //   return tier.allFeatures.find(obj => obj.title === row).value
  // }

  checkType(value: boolean | string){
    return typeof value === "boolean"
  }



}
