import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {IFeatureDetail} from "../../../models/models";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css']
})
export class AddFeatureComponent implements OnInit {

  onSuccess: boolean = false;
  quantity: number = 1;
  feature: IFeatureDetail
  public payPalConfig ?: IPayPalConfig;

  constructor(public dialogRef: MatDialogRef<AddFeatureComponent>,
              private afs: AngularFirestore,
              private boardService: BoardService,
              @Inject(MAT_DIALOG_DATA) public data:  IFeatureDetail ) {
  }

  ngOnInit(): void {
    this.feature = this.data

    if (this.feature.price === 0){
      this.feature.price = 1;
    }

    if(this.feature.valueType === 'number'){
      this.quantity = <number>this.feature.value;
    }

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
            value: this.feature.price + '',
            // breakdown: {
            //   item_total: {
            //     currency_code: 'EUR',
            //     value: this.feature.price + ''
            //   }
            // }
          },
          items: [{
            name: 'x ' + this.feature.title,
            quantity: this.quantity+'',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: this.feature.price + '',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'pay',
        size: 'large',
        layout: 'horizontal',
        height: 38
      },
      onApprove: (data, actions) => {
        actions.order.get().then((res: any) => {
          return this.afs.collection('orders').add(res).then(() => {
            this.onSuccess = true;
            // this.board.paid = true;
            // return this.boardService.updateBoard(this.board).then(() => {
            //   this.onSuccess = true;
            // })
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
