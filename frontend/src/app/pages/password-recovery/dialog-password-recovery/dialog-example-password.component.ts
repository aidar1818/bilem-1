import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendUserCodeRequest } from '../../../store/users/users.actions';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../store/types';
import { Router } from '@angular/router';
import { CodeError, CodeUserData } from '../../../models/user.model';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example-password.component.html',
  styleUrls: ['./dialog-example-password.component.sass']
})
export class DialogExamplePasswordComponent implements OnInit, OnDestroy{
  @ViewChild('f') form!: NgForm;
  error: Observable<CodeError | null>;
  userData: Observable<CodeUserData | null>;
  code!: string | null;
  userSub!: Subscription;
  userEmail!: string | undefined;
  close = true;
  apiCode!: string | null;
  valueCode!: string;

  constructor(private store: Store<AppState>, private router: Router) {
    this.error = store.select(state => state.users.codeError);
    this.userData = store.select(state => state.users.userData);
    this.userSub = this.userData.subscribe(user => {
      this.userEmail = <string>user?.email;
      this.apiCode = <string>user?.code.toString();
    });
  }

  ngOnInit() {
      if(this.code) {
        this.valueCode = this.form.value.code;
        if(this.code === this.valueCode) {
          this.close = false;
        }
        if(this.code !== this.form.value.code) {
          this.close = true;
        }
      }
  }

  checkCode(event: Event) {
    const input = <HTMLInputElement>event.target;
    this.valueCode = input.value;
    if(this.apiCode === this.valueCode) {
      this.close = false;
    }
    if(this.apiCode !== this.valueCode) {
      this.close = true;
    }
  }

  onSubmit() {
    const userCheckCodeData = {
      email: <string>this.userEmail,
      code: this.form.value.code
    };

    this.store.dispatch(sendUserCodeRequest({userData: userCheckCodeData}));
    void this.router.navigate(['/newPassword']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
