import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { searchCoursesRequest } from '../../store/course/course.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  @ViewChild('searchForm') searchForm!: NgForm;
  is_free = false;

  constructor(private store: Store<AppState>) {}

  onSubmit() {
    let courseData = {};

    if(this.searchForm.value.is_free === '' || !this.searchForm.value.is_free) {
      courseData = {
        title: this.searchForm.value.title,
        is_free: this.searchForm.value.is_free,
      }
    }

    if(this.searchForm.value.is_free) {
      courseData = {
        title: this.searchForm.value.title,
        is_free: this.searchForm.value.is_free,
      }
    }

    this.store.dispatch(searchCoursesRequest({courseData}));
  }
}
