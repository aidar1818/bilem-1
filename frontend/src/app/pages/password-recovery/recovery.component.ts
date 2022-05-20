import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { DialogExamplePasswordComponent } from './dialog-password-recovery/dialog-example-password.component';
import { MatDialog } from '@angular/material/dialog';
import { loginFacebookRequest, loginGoogleRequest, sendEmailRequest } from '../../store/users/users.actions';
import { googleLoginUserData, LoginFacebookUser } from '../../models/user.model';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.sass']
})

export class RecoveryComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  googleLoading: Observable<boolean>;
  fbLoading: Observable<boolean>;
  fbUserData!: LoginFacebookUser;
  googleUserData!: googleLoginUserData;
  fbLoginClick = false;
  googleLoginClick = false;
  authStateSub!: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private authService: SocialAuthService) {
    this.loading = store.select(state => state.users.loginLoading);
    this.fbLoading = store.select(state => state.users.loginFacebookLoading);
    this.googleLoading = store.select(state => state.users.googleLoading);
  }

  ngOnInit(): void {
    this.authStateSub = this.authService.authState.subscribe((user: SocialUser) => {
      if(!user) return;

      if(this.googleLoginClick){
        if(user.provider === "GOOGLE"){
          this.googleUserData = {
            authToken: user.authToken,
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: user.response.access_token
          }
        }
        this.store.dispatch(loginGoogleRequest({userData: this.googleUserData}));
      }

      if(this.fbLoginClick){
        if(user.provider === "FACEBOOK"){
          this.fbUserData = {
            authToken: user.authToken,
            id: user.id,
            email: user.email,
            name: user.name,
          }
        }
        this.store.dispatch(loginFacebookRequest({userData: this.fbUserData}));
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogExamplePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    const email = this.form.value;
    this.store.dispatch(sendEmailRequest({email: email}));
  }

  fbLogin() {
    this.fbLoginClick = true;
    void this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin() {
    this.googleLoginClick = true;
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
