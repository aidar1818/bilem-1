import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {}
}
