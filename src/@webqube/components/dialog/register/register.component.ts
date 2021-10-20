import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";


interface IClient{
  name: string,
  email: string,
  business:string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('',[ Validators.required]),
    email: new FormControl('',[ Validators.required, Validators.email]),
    business: new FormControl(''),
  });

  clientCollection: AngularFirestoreCollection<IClient>;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private fns: AngularFireFunctions,  private afs: AngularFirestore) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend(){
    if (!this.registerForm.valid){
      console.log("not valid")
      return;
    }
    console.log(this.registerForm.value)
    const callable = this.fns.httpsCallable('hello');
    callable(this.registerForm.value).toPromise().then(res => {console.log(res); this.dialogRef.close();});
    this.clientCollection.add(this.registerForm.value)
  }

  ngOnInit(): void {
    this.clientCollection = this.afs.collection<IClient>('clients');
  }

  get f()
  {
    return this.registerForm.controls;
  }


}
