import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css']
})
export class AddFeatureComponent implements OnInit {

  onSuccess: boolean = false;
  public payPalConfig ?: IPayPalConfig;
  constructor(public dialogRef: MatDialogRef<AddFeatureComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("add feature",this.data);
  }

  private initConfig(): void {
    // this.payPalConfig = {
    //   currency: 'EUR',
    //   clientId: environment.paypal.clientID,
    //   createOrderOnClient: (data) => <ICreateOrderRequest>{
    //     intent: 'CAPTURE',
    //     purchase_units: [{
    //       amount: {
    //         currency_code: 'EUR',
    //         value: this.value,
    //         breakdown: {
    //           item_total: {
    //             currency_code: 'EUR',
    //             value: this.value
    //           }
    //         }
    //       },
    //       items: [{
    //         name: 'x ' + this.plan.label + ' | ' + this.board.label,
    //         quantity: '1',
    //         category: 'DIGITAL_GOODS',
    //         unit_amount: {
    //           currency_code: 'EUR',
    //           value: this.value,
    //         },
    //       }]
    //     }]
    //   },
    //   advanced: {
    //     commit: 'true'
    //   },
    //   style: {
    //     label: 'paypal',
    //     layout: 'vertical',
    //   },
    //   onApprove: (data, actions) => {
    //     actions.order.get().then((res: any) => {
    //       return this.afs.collection('orders').add(res).then(() => {
    //         this.board.paid = true;
    //         return this.boardService.updateBoard(this.board).then(() => {
    //           this.onSuccess = true;
    //         })
    //       })
    //     });
    //   },
    //   onClientAuthorization: (data) => {
    //     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //   },
    //   onCancel: (data, actions) => {
    //     console.log('OnCancel', data, actions);
    //   },
    //   onError: err => {
    //     console.log('OnError', err);
    //   },
    //   onClick: (data, actions) => {
    //     console.log('onClick', data, actions);
    //   }
    // };

  }

}
