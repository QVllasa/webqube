import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IIndividualRequest} from "../../../models";


@Component({
  selector: 'app-individual-request',
  templateUrl: './individual-request.component.html',
  styleUrls: ['./individual-request.component.css']
})
export class IndividualRequestComponent implements OnInit {

  individualRequestCollection: AngularFirestoreCollection<IIndividualRequest>;
  isLoading: boolean = false;
  isSuccess: boolean = false;

  individualRequestForm = new FormGroup({
    name: new FormControl({value:'', disabled: this.isLoading}, [Validators.required]),
    email: new FormControl({value:'', disabled: this.isLoading}, [Validators.required, Validators.email]),
    business: new FormControl({value:'', disabled: this.isLoading}),
    message: new FormControl({value:'', disabled: this.isLoading}, [Validators.required]),
  });

  individualRequestObj: IIndividualRequest;

  constructor(
    public dialogRef: MatDialogRef<IndividualRequestComponent>,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.individualRequestCollection = this.afs.collection<IIndividualRequest>('individualRequests');
    this.individualRequestForm.valueChanges.subscribe((data)=>{
      this.individualRequestObj = data
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend() {
    this.isLoading = true;
    if (!this.individualRequestForm.valid) {
      console.log("not valid")
      return;
    }
    console.log(this.individualRequestObj)
    this.individualRequestCollection.add(this.individualRequestObj).then(res=>{
      this.isLoading = false
      this.isSuccess = true;
    })
      .catch((err) => {
        console.log(err)
      })
  }

  get f() {
    return this.individualRequestForm.controls;
  }

}
