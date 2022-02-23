import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IMilestone, ITier} from "../../../models/models";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {IBoard} from "../../../models/scrumboard.interface";
import {ProjectService} from "../../../services/project.service";
import {environment} from "../../../../environments/environment";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
  value: string ;
  project$ = this.projectService.project;
  tiers$ = this.projectService.tiers;

  onError:boolean;
  onSuccess: boolean = false;


  constructor(public dialogRef: MatDialogRef<PayMilstoneComponent>,
              private projectService: ProjectService,
              private afs: AngularFirestore,
              @Inject(MAT_DIALOG_DATA) public data: IBoard,) {

  }

  ngOnInit(): void {
    this.board = this.data;
    this.tier = this.tiers$.value.find(obj => obj.id === this.project$.value.tierID)
    this.value = (this.tier.price/3).toString();
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
            value:this.value,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.value
              }
            }
          },
          items: [{
            name: 'x '+this.tier.label+' | '+this.board.label,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: this.value,
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
        actions.order.get().then((res: any) => {
          return this.afs.collection('orders').add(res).then(()=>{
            return this.projectService.activateBoard(this.board.id, true).then(()=>{
              this.onSuccess = true;
            })
          })
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
