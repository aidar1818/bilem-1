import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {googleLoginUserData, LoginError, LoginFacebookUser, LoginUserData} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/types';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {
  changeSaveUser,
  loginFacebookRequest,
  loginGoogleRequest,
  loginUserRequest
} from '../../store/users/users.actions';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
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
    private authService: SocialAuthService,
    private route: ActivatedRoute
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
    this.fbLoading = store.select(state => state.users.loginFacebookLoading);
    this.googleLoading = store.select(state => state.users.googleLoading);
  }

  ngOnInit(): void {
    this.authStateSub = this.authService.authState.subscribe((user: SocialUser) => {
      if (!user) return;

      if (this.googleLoginClick) {
        if (user.provider === "GOOGLE") {
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

      if (this.fbLoginClick) {
        if (user.provider === "FACEBOOK") {
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

    this.route.data.subscribe(data => {
      let remember = localStorage.getItem('email');

      if (remember) {
        this.setFormValue({
          email: localStorage.getItem('email'),
          password: localStorage.getItem('password'),
          check: true,
        });
      } else {
        this.setFormValue({
          email: '',
          password: '',
          check: false,
        });
      }
    });
  }

  setFormValue(value: {[key: string] : any}) {
    setTimeout(() => {
      this.form.form.setValue(value);
    })
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    const save = this.form.value.check;
    this.store.dispatch(changeSaveUser({save}));
    this.store.dispatch(loginUserRequest({userData}));

    if (userData.check) {
      localStorage.setItem('email', this.form.value.email);
      localStorage.setItem('password', this.form.value.password);
    } else {
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
    }
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
