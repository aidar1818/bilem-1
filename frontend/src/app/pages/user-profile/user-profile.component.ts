import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { User, UserProfileData } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { fetchUserProfileRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfileData: Observable<null | UserProfileData>;
  userProfileDataObject!: UserProfileData | null;
  userProfileSub!: Subscription;
  user: Observable<null | User>;
  userId: string = '';

  constructor(private store: Store<AppState>,  private route: ActivatedRoute,) {
    this.userProfileData = store.select(state => state.users.userProfileData);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.userId = params['id'];
      this.store.dispatch(fetchUserProfileRequest({userId: this.userId}));
    });

    this.userProfileSub = this.userProfileData.subscribe(profile => {
      if(profile) {
        this.userProfileDataObject = profile;
      }
    });

  }

  ngOnDestroy() {
    this.userProfileSub.unsubscribe();
  }
















}
