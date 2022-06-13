import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Course } from "../../../models/course.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/types";
import { fetchCoursesRequest } from "../../../store/course/course.actions";

@Component({
  selector: 'app-all-paid-courses',
  templateUrl: './all-paid-courses.component.html',
  styleUrls: ['./all-paid-courses.component.css']
})
export class AllPaidCoursesComponent implements OnInit {
  courses: Observable<Course[] | null>;
  loading: Observable<boolean | null>;

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
    this.loading = store.select(state => state.courses.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCoursesRequest());
  }
}
