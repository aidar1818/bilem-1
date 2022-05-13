import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories/categories.actions';
import { fetchSubcategoriesByCategoryRequest } from '../../store/subcategories/subcategories.actions';
import { Subcategory } from '../../models/subcategory.model';
import { Course } from '../../models/course.model';
import { FormControl } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  categories: Observable<Category[]>;
  courses: Observable<Course[]>;
  coursesBySubcategory!: Course[];
  categoriesArray!: Category[];
  categorySub!: Subscription;
  coursesSub!: Subscription;
  subCategorySub!: Subscription;
  coursesBySubcategorySub!: Subscription;
  subCategories: Observable<Subcategory[]>;
  fetchLoadingSubcategories: Observable<boolean>;
  subCategoriesArray!: Subcategory[];
  coursesArray!: Course[];
  fetchLoadingCategory: Observable<boolean>;
  fetchLoadingError: Observable<null | string>
  myControl = new FormControl();
  courseTitles!: string[];
  filteredOptions!: Observable<Course[]>;

  constructor(
    private store: Store<AppState>,
    private coursesService: CourseService,
    private router: Router,
    public dialog: MatDialog
    ) {
    this.user = store.select(state => state.users.user);
    this.categories = store.select(state => state.categories.categories);
    this.courses = store.select(state => state.courses.courses);
    this.fetchLoadingCategory = store.select(state => state.categories.fetchLoading);
    this.fetchLoadingError = store.select(state => state.categories.fetchLoadingError);
    this.subCategories = store.select(state => state.subcategories.subcategories);
    this.fetchLoadingSubcategories = store.select(state => state.subcategories.fetchLoading);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filter(title) : this.coursesArray.slice())),
    );

    this.store.dispatch(fetchCategoriesRequest());

    this.categorySub = this.categories.subscribe(categories => {
      if (categories) {
        this.categoriesArray = categories;
      }
    });

    this.coursesSub = this.courses.subscribe(courses => {
      if (courses) {
        this.coursesArray = courses;
      }
    });
    this.coursesArray.forEach(course => {
      this.courseTitles.push(course.title);
    })
  }

  openDialogCategoryDelete(id: string, title: string): void {
    this.dialog.open(ModalComponent, {
      data: {title: `категорию "${title}"`, id, type: 'Категория'},
    });
  }

  openDialogSubcategoryDelete(id: string, title: string): void {
    this.dialog.open(ModalComponent, {
      data: {title: `подкатегорию "${title}"`, id, type: 'Подкатегория'},
    });
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


  fetchSubCategory(id: string) {

    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));
    this.subCategorySub = this.subCategories.subscribe(subCategories => {
      if (subCategories) {
        this.subCategoriesArray = subCategories;
      }
    });
  }

  fetchSubCategoryCourses(id: string) {
    this.coursesBySubcategorySub = this.coursesService.getCoursesBySubcategory(id).subscribe(courses => {
      this.coursesBySubcategory = courses;
    });
  }

  show() {
    const drop = <HTMLElement>document.querySelector('.dropdown-content');
    drop.style.display = 'block';
  }

  hide() {
    const drop = <HTMLElement>document.querySelector('.dropdown-content');
    drop.style.display = 'none';
  }

  getCourse(id: string) {
    this.hide();
    void this.router.navigate([`/course/${id}`]);
  }

  getCategoryCourses(id: string) {
    this.hide();
    void this.router.navigate([`/categories/${id}`]);
  }

  getSubcategoryCourses(id: string) {
    this.hide();
    void this.router.navigate([`/subcategories/${id}`]);
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.subCategorySub.unsubscribe();
    this.coursesSub.unsubscribe();
    this.coursesBySubcategorySub.unsubscribe();
  }
}
