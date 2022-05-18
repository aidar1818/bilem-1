import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit, OnDestroy{
  user: Observable<null | User>;
  userSub!: Subscription;
  userDisplayName = '';
  userId = '';

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      if(user) {
        this.userDisplayName = user?.displayName;
        this.userId = user._id;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

