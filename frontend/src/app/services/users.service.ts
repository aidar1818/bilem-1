import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserData, RegisterUserData, User } from '../models/user.models';
import { environment as env } from '../../environments/environment';
import { SocialUser } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData) {
    return this.http.post<User>(env.apiUrl + '/users', userData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }

  loginWithFacebook(user: SocialUser) {
    return this.http.post<User>(env.apiUrl + '/users/facebookLogin', {
      authToken: user.authToken,
      id: user.id,
      email: user.email,
      name: user.name
    });
  }
}
