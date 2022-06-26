import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCategoriesRequest } from '../../store/categories/categories.actions';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { fetchSubcategoriesByCategoryRequest } from '../../store/subcategories/subcategories.actions';
import { Subcategory } from '../../models/subcategory.model';
import { SubcategoriesService } from '../../services/subcategories.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CourseData } from '../../models/course.model';
import { createCourseRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseForm!: FormGroup;
  value!: string;
  categories: Observable<Category[]>;
  subcategories: Observable<Subcategory[]>;
  loading: Observable<boolean>;
  is_free!: boolean;
  accessInfoBlock = true;
  imageSrc: string = '';

  constructor(private store: Store<AppState>, private subcategoryService: SubcategoriesService) {
    this.categories = store.select(state => state.categories.categories);
    this.subcategories = store.select(state => state.subcategories.subcategories);
    this.loading = store.select(state => state.courses.createLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
    this.is_free = this.subcategoryService.is_free;
    this.courseForm = new FormGroup({
      title: new FormControl('', Validators.required),
      information: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      price: new FormControl(),
      promoVideo: new FormControl(),
      image: new FormControl(),
      agree: new FormControl('', Validators.required),
    })
  }

  getSubCategories(id: string) {
    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.courseForm.get(fieldName);
    return Boolean (field && field.touched && field.errors?.[errorType]);
  }

  onFileChange(event:any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onSubmit() {
    const course = this.courseForm.value;
    const courseData: CourseData = {
      title: course.title,
      description: course.description,
      information: course.information,
      category: course.category,
      subcategory: course.subcategory,
      price: course.price? course.price : null,
      promoVideo: course.promoVideo? course.promoVideo : null,
      image: course.image,
      is_free: this.is_free,
    }

    this.store.dispatch(createCourseRequest({courseData}));
  }

  closeInfoBlock() {
    this.accessInfoBlock = false;
  }
}
