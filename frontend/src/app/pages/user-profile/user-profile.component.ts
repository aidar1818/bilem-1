import { Component, OnDestroy, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import { Observable, Subscription } from 'rxjs';
import { socialNetworks, User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  social: Observable<null | socialNetworks[]>;
  userData!: User | null;
  userSub!: Subscription;
  socialSub!: Subscription;
  socialNetworks!: socialNetworks[] | null;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.social = <Observable<socialNetworks[]>>store.select(state => state.users.user?.socialNetworks);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.userData = user;
    })
    this.socialSub = this.social.subscribe(links => {
      this.socialNetworks = links;
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.socialSub.unsubscribe();
  }
















}
