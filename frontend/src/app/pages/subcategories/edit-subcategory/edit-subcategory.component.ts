import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSubcategoryData, Subcategory } from '../../../models/subcategory.model';
import { createSubcategoryRequest, editSubcategoryRequest } from '../../../store/subcategories/subcategories.actions';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | string>;
  loading: Observable<boolean>;
  isEdit = false;
  editedId = '';
  categoryId = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loading = store.select(state => state.subcategories.createLoading);
    this.error = store.select(state => state.subcategories.createError);
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });

    this.route.data.subscribe(data => {
      const subcategory = <Subcategory | null>data['subcategory'];

      if (subcategory) {
        this.isEdit = true;
        this.editedId = subcategory._id;
        this.setFormValue({
          title: subcategory.title,
        });
      } else {
        this.isEdit = false;
        this.editedId = '';
        this.setFormValue({
          title: '',
        });
      }
    });
  }

  setFormValue(value: {[key: string] : any}) {
    setTimeout(() => {
      this.form.form.setValue(value);
    })
  }

  createSubcategory() {
    const id = this.editedId;
    const subcategoryData: CreateSubcategoryData = {
     category: this.categoryId,
     title: this.form.value.title
    }

    if (this.isEdit) {
      this.store.dispatch(editSubcategoryRequest({id, change: {title: subcategoryData.title}}));
    } else {
      this.store.dispatch(createSubcategoryRequest({subcategoryData}));
    }
  }

}
