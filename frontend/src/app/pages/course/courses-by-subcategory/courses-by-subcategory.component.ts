import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/category.model';
import { AppState } from '../../../store/types';
import { fetchCoursesBySubcategoryRequest } from '../../../store/course/course.actions';
import { fetchSubcategoryByIdRequest } from '../../../store/subcategories/subcategories.actions';

@Component({
  selector: 'app-courses-by-category',
  templateUrl: './courses-by-subcategory.component.html',
  styleUrls: ['./courses-by-subcategory.component.css']
})
export class CoursesBySubcategoryComponent implements OnInit {
  courses: Observable<Course[]>;
  subcategory: Observable<Category | null>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  subcategoryId!: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.courses = store.select(state => state.courses.courses);
    this.subcategory = store.select(state => state.subcategories.subcategory);
    this.loading = store.select(state => state.courses.fetchBySubcategoryLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subcategoryId = params['id'];
      this.store.dispatch(fetchCoursesBySubcategoryRequest({id: this.subcategoryId}));
      this.store.dispatch(fetchSubcategoryByIdRequest({id: this.subcategoryId}));
    });
  }
}
