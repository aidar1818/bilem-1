import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  user: Observable<User | null>;
  userData!: User | null;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.userData = user;
    });
  }

  ngOnInit() {
    if (this.userData) {
      this.setFormValue({
        email: this.userData.email,
        displayName: this.userData.displayName,
        aboutMe: this.userData?.aboutMe || '',
      });
    } else {
      this.setFormValue({
        email: '',
        displayName: '',
        aboutMe: '',
      });
    }
  }

  setFormValue(value: {[key: string] : any}) {
    setTimeout(() => {
      this.form.form.setValue(value);
    })
  }

  onSubmit() {

  }
}
