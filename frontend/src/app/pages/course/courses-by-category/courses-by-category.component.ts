import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/category.model';
import { fetchCategoryByIdRequest } from '../../../store/categories/categories.actions';
import { AppState } from '../../../store/types';
import { fetchCoursesByCategoryRequest } from '../../../store/course/course.actions';

@Component({
  selector: 'app-courses-by-category',
  templateUrl: './courses-by-category.component.html',
  styleUrls: ['./courses-by-category.component.css']
})
export class CoursesByCategoryComponent implements OnInit {
  courses: Observable<Course[]>;
  category: Observable<Category | null>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  categoryId!: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.courses = store.select(state => state.courses.courses);
    this.category = store.select(state => state.categories.category);
    this.loading = store.select(state => state.courses.fetchSortLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.store.dispatch(fetchCoursesByCategoryRequest({id: this.categoryId}));
      this.store.dispatch(fetchCategoryByIdRequest({id: this.categoryId}));
    });
  }
}
