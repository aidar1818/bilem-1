import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { User } from '../../models/user.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';
import { Category } from '../../models/category.model';
import { deleteCategoryRequest, fetchCategoriesRequest } from '../../store/categories/categories.actions';
import {
  deleteSubcategoryRequest,
  fetchSubcategoriesByCategoryRequest
} from '../../store/subcategories/subcategories.actions';
import { Subcategory } from '../../models/subcategory.model';
import { Course } from '../../models/course.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() categoryId = new EventEmitter();
  user: Observable<null | User>;
  categories: Observable<Category[]>;
  courses: Observable<Course[]>;
  categoriesArray!: Category[];
  categorySubscription!: Subscription;
  subCoursesSubscription!: Subscription;
  subCategories: Observable<Subcategory[]>;
  subCategoriesArray!: Subcategory[];
  coursesArray!: Course[];
  subCategorySubscription!: Subscription;
  fetchLoadingCategory: Observable<boolean>;
  fetchLoadingError: Observable<null | string>
  myControl = new FormControl();
  courseTitles!: string[];
  filteredOptions!: Observable<Course[]>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.categories = store.select(state => state.categories.categories);
    this.courses = store.select(state => state.courses.courses);
    this.fetchLoadingCategory = store.select(state => state.categories.fetchLoading);
    this.fetchLoadingError = store.select(state => state.categories.fetchLoadingError);
    this.subCategories = store.select(state => state.subcategories.subcategories);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filter(title) : this.coursesArray.slice())),
    );

    this.store.dispatch(fetchCategoriesRequest());

    this.categorySubscription = this.categories.subscribe(categories => {
      if (categories) {
        this.categoriesArray = categories;
      }
    });

    this.subCategorySubscription = this.subCategories.subscribe(subCategories => {
      if (subCategories) {
        this.subCategoriesArray = subCategories;
      }
    });

    this.subCoursesSubscription = this.courses.subscribe(courses => {
      if (courses) {
        this.coursesArray = courses;
      }
    });
    this.coursesArray.forEach(course => {
      this.courseTitles.push(course.title);
    })
  }

  displayFn(course: Course): string {
    return course && course.title ? course.title : '';
  }

  private _filter(name: string): Course[] {
    const filterValue = name.toLowerCase();

    return this.coursesArray.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  deleteCategory(id: string) {
    this.store.dispatch(deleteCategoryRequest({id}))
  }

  fetchSubCategory(id: string) {
    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));
  }

  deleteSubcategory(id: string) {
    this.store.dispatch(deleteSubcategoryRequest({id}))
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.subCategorySubscription.unsubscribe();
  }

  setCategoryId(_id: string) {
    this.categoryId.emit(_id);
  }
}
