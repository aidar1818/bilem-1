import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCategoriesRequest } from '../../store/categories/categories.actions';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { fetchSubcategoriesByCategoryRequest } from '../../store/subcategories/subcategories.actions';
import { Subcategory } from '../../models/subcategory.model';
import { SubcategoriesService } from '../../services/subcategories.service';
import { NgForm } from '@angular/forms';
import { CourseData } from '../../models/course.model';
import { createCourseRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  value!: string;
  categories: Observable<Category[]>;
  subcategories: Observable<Subcategory[]>;
  loading: Observable<boolean>;
  is_free!: boolean;

  constructor(private store: Store<AppState>, private subcategoryService: SubcategoriesService) {
    this.categories = store.select(state => state.categories.categories);
    this.subcategories = store.select(state => state.subcategories.subcategories);
    this.loading = store.select(state => state.courses.createLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
    this.is_free = this.subcategoryService.is_free;
  }

  getSubCategories(id: string) {
    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));
  }

  onSubmit() {
    const course = this.form.value;
    const courseData: CourseData = {
      title: course.title,
      description: course.description,
      subcategory: course.subcategory,
      price: course.price? course.price : null,
      image: course.image,
      is_free: this.is_free,
    }


    this.store.dispatch(createCourseRequest({courseData}));
  }
}
