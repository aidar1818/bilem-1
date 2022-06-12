import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { searchCoursesRequest } from '../../store/course/course.actions';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { deleteCategoryRequest, fetchCategoriesRequest } from '../../store/categories/categories.actions';
import {
  deleteSubcategoryRequest,
  fetchSubcategoriesByCategoryRequest
} from '../../store/subcategories/subcategories.actions';
import { ModalComponent } from '../../ui/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../models/category.model';
import { Course } from '../../models/course.model';
import { Subcategory } from '../../models/subcategory.model';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: [ './catalog.component.css' ]
})
export class CatalogComponent implements OnInit, OnDestroy {
  @ViewChild('searchForm') searchForm!: NgForm;
  querySub!: Subscription;
  searchLoading: Observable<boolean>;

  categoriesArray!: Category[];
  categories: Observable<Category[]>;
  categorySub!: Subscription;
  fetchLoadingCategory: Observable<boolean>;

  courses: Observable<Course[]>;
  coursesBySubcategorySub!: Subscription;

  subCategoriesArr: Subcategory[] = [];
  subCategorySub!: Subscription;
  subCategories: Observable<Subcategory[]>;
  fetchLoadingSubcategories: Observable<boolean>;
  fetchLoadingError: Observable<null | string>

  selectedCategory = '';
  selectedSubCategory = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.searchLoading = store.select(state => state.courses.searchLoading);
    this.categories = store.select(state => state.categories.categories);
    this.courses = store.select(state => state.courses.courses);
    this.fetchLoadingCategory = store.select(state => state.categories.fetchLoading);
    this.fetchLoadingError = store.select(state => state.categories.fetchLoadingError);
    this.subCategories = store.select(state => state.subcategories.subcategories);
    this.fetchLoadingSubcategories = store.select(state => state.subcategories.fetchLoading);
  }

  ngOnInit() {
    this.store.dispatch(fetchCategoriesRequest());

    this.querySub = this.route.queryParams
      .subscribe(params => {
          if (params) {
            const title = params['title']?.toLowerCase();
            setTimeout(() => {
              this.searchForm.form.patchValue(params);
              this.store.dispatch(searchCoursesRequest(
                {courseData: {title, is_free: params['is_free']}}));
            })
          }
        }
      );

    this.categorySub = this.categories.subscribe(categories => {
      if (categories) {
        this.categoriesArray = categories;
      }
    });

    this.subCategorySub = this.subCategories.subscribe(subCategories => {
      if (subCategories) {
        this.subCategoriesArr = subCategories;
      }
    });
  }

  selectCategory(id: string) {
    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id: ''}));
    this.selectedCategory = id;
  }

  selectSubCategory(id: string) {
    this.selectedSubCategory = id;
  }

  openDialogCategoryDelete(id: string, title: string): void {
    this.dialog.open(ModalComponent, {
      data: {title: `категорию "${ title }"`, id, type: 'Категория'},
    });
  }

  openDialogSubcategoryDelete(id: string, title: string): void {
    this.dialog.open(ModalComponent, {
      data: {title: `подкатегорию "${ title }"`, id, type: 'Подкатегория'},
    });
  }

  show() {
    const drop = <HTMLElement>document.querySelector('.dropdown');
    drop.style.display = 'flex';
    drop.style.flexDirection = 'row';
  }

  hide() {
    const drop = <HTMLElement>document.querySelector('.dropdown');
    drop.style.display = 'none';
  }

  showSub(id: string) {
    this.selectedCategory = id;
    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));

    const drop = <HTMLElement>document.querySelector('.subcategories-content');
    drop.style.display = 'flex';
    drop.style.flexDirection = 'column';
  }

  hideSub() {
    const drop = <HTMLElement>document.querySelector('.subcategories-content');
    drop.style.display = 'none';
  }

  getCategoryCourses(id: string) {
    this.hide();
    void this.router.navigate([ `/categories/${ id }` ]);
  }

  getSubcategoryCourses(id: string) {
    this.hide();
    void this.router.navigate([ `/subcategories/${ id }` ]);
  }

  onSubmit() {
    if (this.searchForm.value.title === '' && (this.searchForm.value.is_free === '' || !this.searchForm.value.is_free)) {
      void this.router.navigate([ '/' ]);
    }

    let courseData = {};

    if (this.searchForm.value.is_free === '' || !this.searchForm.value.is_free) {
      courseData = {
        title: this.searchForm.value.title.toLowerCase()
      }
    }

    if (this.searchForm.value.is_free) {
      courseData = {
        title: this.searchForm.value.title.toLowerCase(),
        is_free: this.searchForm.value.is_free
      }
    }

    this.store.dispatch(searchCoursesRequest({courseData}));
  }

  deleteSubcategory(id: string) {
    this.store.dispatch(deleteSubcategoryRequest({id}));
  }

  deleteCategory(id: string) {
    this.store.dispatch(deleteCategoryRequest({id}));
  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    if (this.subCategorySub) {
      this.subCategorySub.unsubscribe();
    }
    if (this.coursesBySubcategorySub) {
      this.coursesBySubcategorySub.unsubscribe();
    }
  }
}
