import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {
  editPasswordFailure,
  editPasswordRequest,
  editPasswordSuccess, fetchUserFailure, fetchUserRequest, fetchUserSuccess,
  loginFacebookFailure,
  loginFacebookRequest,
  loginFacebookSuccess,
  loginGoogleFailure,
  loginGoogleRequest,
  loginGoogleSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  sendEmailRequest,
  sendEmailSuccess,
  sendUserCodeFailure,
  sendUserCodeRequest,
  sendUserCodeSuccess
} from './users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { AppState } from '../types';
import { Store } from '@ngrx/store';
import { SocialAuthService } from 'angularx-social-login';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {}

  getUser = createEffect(() => this.actions.pipe(
    ofType(fetchUserRequest),
    mergeMap(() => this.usersService.getUser().pipe(
      map(user => fetchUserSuccess({user})),
      this.helpers.catchServerError(fetchUserFailure)
    ))
  ))

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Успешная регистрация');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ))

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Вход выполнен');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ))

  loginFacebook  = createEffect(() => this.actions.pipe(
    ofType(loginFacebookRequest),
    mergeMap(({userData}) => this.usersService.loginWithFacebook(userData).pipe(
      map(user => loginFacebookSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Успешная регистрация через Facebook');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginFacebookFailure)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(async () => {
          await this.auth.signOut();
          await this.router.navigate(['/']);
          this.helpers.openSnackbar('Выход из аккаунта');
        })
      );
    }))
  )

  sendEmail = createEffect(() => this.actions.pipe(
    ofType(sendEmailRequest),
    mergeMap( ({email}) => this.usersService.recoveryPassword(email).pipe(
      map(user => sendEmailSuccess({user})),
    ))
  ));

  sendCode = createEffect(() => this.actions.pipe(
    ofType(sendUserCodeRequest),
    mergeMap(({userData}) => this.usersService.sendCode(userData).pipe(
      map(code => {
        return sendUserCodeSuccess({code})
      }),
      catchError(() => of(sendUserCodeFailure({error: 'Вы ввели не актуальный код, попробуйте еще раз отправить форму'})))
    ))
  ));

  editPassword = createEffect(() => this.actions.pipe(
    ofType(editPasswordRequest),
    mergeMap( ({password}) => this.usersService.editPassword(password).pipe(
      map(() => editPasswordSuccess()),
      tap(() => {
        void this.router.navigate(['/login']);
      })
    )),
    catchError(() => of(editPasswordFailure({error: 'Что-то пошло не так'})))
  ));

  loginGoogle = createEffect(() => this.actions.pipe(
    ofType(loginGoogleRequest),
    mergeMap(({userData}) => this.usersService.loginGoogle(userData).pipe(
      map(user => loginGoogleSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Успешная регистрация через Google!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginGoogleFailure)
    ))
  ));
}
