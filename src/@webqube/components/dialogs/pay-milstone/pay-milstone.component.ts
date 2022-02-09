import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IMilestone, ITier} from "../../../models/models";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {IBoard} from "../../../models/scrumboard.interface";
import {ProjectService} from "../../../services/project.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-pay-milstone',
  templateUrl: './pay-milstone.component.html',
  styleUrls: ['./pay-milstone.component.css']
})
export class PayMilstoneComponent implements OnInit {

  public payPalConfig ?: IPayPalConfig;
  board: IBoard;
  milestones$ = this.projectService.milestones;
  tier: ITier;
  project$ = this.projectService.project;
  tiers$ = this.projectService.tiers;


  constructor(public dialogRef: MatDialogRef<PayMilstoneComponent>,
              private projectService: ProjectService,
              @Inject(MAT_DIALOG_DATA) public data: IBoard,) {
    this.board = data;
    this.tier = this.tiers$.value.find(obj => obj.id === this.project$.value.tierID)
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.paypal.clientID,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(() => {
          console.log('onApprove - you can get full order details inside onApprove: ');
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

}
