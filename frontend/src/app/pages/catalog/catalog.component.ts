import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCoursesRequest } from '../../store/course/course.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  courses: Observable<Course[]>;
  @ViewChild('f') form!: NgForm;
  is_free = false;

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCoursesRequest());
  }

  onSubmit() {
    console.log(this.form.value)
  }
}
