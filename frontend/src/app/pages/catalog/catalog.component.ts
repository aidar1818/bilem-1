import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { searchCoursesRequest } from '../../store/course/course.actions';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy{
  @ViewChild('searchForm') searchForm!: NgForm;
  querySub!: Subscription;
  searchLoading: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute )
  {
    this.searchLoading = store.select(state => state.courses.searchLoading);
  }

  ngOnInit() {
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
  }

  onSubmit() {
    if (this.searchForm.value.title === '' && (this.searchForm.value.is_free === '' || !this.searchForm.value.is_free)) {
      void this.router.navigate(['/']);
    }

    let courseData = {};

    if(this.searchForm.value.is_free === '' || !this.searchForm.value.is_free) {
        courseData = {
        title: this.searchForm.value.title.toLowerCase()
      }
    }

    if(this.searchForm.value.is_free) {
      courseData = {
        title: this.searchForm.value.title.toLowerCase(),
        is_free: this.searchForm.value.is_free
      }
    }

    this.store.dispatch(searchCoursesRequest({courseData}));
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }
}
