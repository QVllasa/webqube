import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


export interface DialogData {
  animal: string;
  name: string;
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

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fns: AngularFireFunctions, private fb: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend(){
    if (!this.registerForm.valid){
      console.log("not valid")
      return;
    }
    console.log(this.registerForm.value)
    // const callable = this.fns.httpsCallable('sayHello');
    // callable({name: "AAAAAA"}).toPromise().then(res => {console.log(res)});
  }

  ngOnInit(): void {
  }

  get f()
  {
    return this.registerForm.controls;
  }


}
