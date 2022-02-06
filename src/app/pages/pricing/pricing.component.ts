import {Component, OnInit} from '@angular/core';
import {columnsKeys, faqs, featureComparison} from 'src/@webqube/static/static';
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
  featureComparison = featureComparison
  priceCards: ITier[];
  faqs = faqs

  isMonthly: boolean = true;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.afs.collection<ITier>('tiers').valueChanges().subscribe(tiers => {
      this.priceCards = tiers;
    })
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
