import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { googleLoginUserData, LoginError, LoginFacebookUser, LoginUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { loginFacebookRequest, loginGoogleRequest, loginUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  googleLoading: Observable<boolean>;
  fbLoading: Observable<boolean>;
  fbUserData!: LoginFacebookUser;
  googleUserData!: googleLoginUserData;
  fbLoginClick = false;
  googleLoginClick = false;
  authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
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

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
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
