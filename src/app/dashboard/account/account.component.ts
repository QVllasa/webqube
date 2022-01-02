import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {IUser} from "../../../@webqube/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: IUser | null;
  isLoading: boolean = false;
  isSuccess: boolean = false;


  userForm = new FormGroup({
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    displayName: new FormControl({value: '', disabled: true}, [Validators.required]),
    phoneNumber: new FormControl({value: '', disabled: true}),
  });

  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      this.userForm.patchValue({
        displayName: user?.displayName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
      });
    })

  }

  ngOnInit(): void {
  }

  onResetPassword() {
    this.isLoading = true;
    if (!this.user?.email) {
      return;
    }
    this.auth.sendPasswordResetEmail(this.user.email).then(() => {
      this.isLoading = false;
      this.isSuccess = true;
    })
  }

  toggleEdit(type: string) {
    if (this.userForm.get(type)?.enabled) {
      this.userForm.get(type)?.disable();
      return;
    }

    console.log(type);
    // this.isEditMode = type;
    // this.userForm.get(type)?.enable();
    // this.auth.user.subscribe(user => {
    //
    // })
  }
}
