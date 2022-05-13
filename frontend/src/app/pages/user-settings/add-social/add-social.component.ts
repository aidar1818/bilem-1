import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Observable } from 'rxjs';
import { socialNetworks, User } from '../../../models/user.model';
import { addSocialNetworksRequest } from '../../../store/users/users.actions';

@Component({
  selector: 'app-add-social',
  templateUrl: './add-social.component.html',
  styleUrls: ['./add-social.component.css']
})
export class AddSocialComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  user: Observable<User | null>;
  userData!: User | null;
  socialNetworks!: socialNetworks[] | null;
  socialLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.socialLoading = store.select(state => state.users.addSocialNetworksLoading);
    this.user.subscribe(user => {
      this.userData = user;
      this.socialNetworks = <socialNetworks[]>this.userData?.socialNetworks;
    });
  }

  ngOnInit() {
    if (this.socialNetworks) {
      this.socialNetworks?.forEach(link => {
        this.setFormValue({
          fb: link.fb,
          github: link.github,
          vk: link.vk,
          tw: link.tw,
          instagram: link.instagram,
          skype: link.skype,
          tme: link.tme,
          website: link.website,
          youtube: link.youtube,
        });
      })
    } else {
      this.setFormValue({
        fb: '',
        github: '',
        vk: '',
        tw: '',
        instagram: '',
        skype: '',
        tme: '',
        website: '',
        youtube: '',
      })
    }
  }

  setFormValue(value: {[key: string] : any}) {
    setTimeout(() => {
      this.form.form.setValue(value);
    })
  }

  onSubmit() {
    const link = this.form.value;

    const socialNetworks = {
      userId: <string>this.userData?._id,
      fb: link.fb,
      github: link.github,
      vk: link.vk,
      tw: link.tw,
      instagram: link.instagram,
      skype: link.skype,
      tme: link.tme,
      website: link.website,
      youtube: link.youtube,
    }

    this.store.dispatch(addSocialNetworksRequest({socialNetworks}));
  }
}
