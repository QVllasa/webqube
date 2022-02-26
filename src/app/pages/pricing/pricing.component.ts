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
import {ITier} from "../../../@webqube/models/models";
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

  priceCards: ITier[] = [];
  rowKeys: string[] = [];
  faqs = faqs


  constructor(public dialog: MatDialog, private afs: AngularFirestore) {

    this.afs.collection<ITier>('tiers').valueChanges({idField: 'id'}).subscribe(tiers => {
      this.priceCards = tiers;

      // Add Features to each tier
      this.afs.collection('tiers')
        .doc(tiers.find(obj => obj.label === 'Starter').id)
        .update({allFeatures: this.starterFeatures})

      this.afs.collection('tiers')
        .doc(tiers.find(obj => obj.label === 'Essential').id)
        .update({allFeatures: this.essentialFeatures})

      this.afs.collection('tiers')
        .doc(tiers.find(obj => obj.label === 'Premium').id)
        .update({allFeatures: this.premiumFeatures})

      this.afs.collection('tiers')
        .doc(tiers.find(obj => obj.label === 'Unlimited').id)
        .update({allFeatures: this.unlimitedFeatures})

    this.rowKeys =  this.priceCards[0].allFeatures.map(obj=>obj.title)
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

  openRequestDialog(priceCard: ITier): void {
    const dialogRef = this.dialog.open(RequestComponent, {data: priceCard});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
