import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './users/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users/users.effects';
import { categoriesReducer } from './categories/categories.reducer';
import { CategoriesEffects } from './categories/categories.effects';
import { subcategoriesReducer } from './subcategories/subcategories.reducer';
import { SubcategoriesEffects } from './subcategories/subcategories.effects';
import { courseReducer } from './course/course.reducer';
import { CourseEffects } from './course/course.effects';
import { modulesReducer } from './modules/modules.reducer';
import { ModulesEffects } from './modules/modules.effects';
import { lessonsReducer } from './lessons/lessons.reducer';
import { LessonsEffects } from './lessons/lessons.effects';
import { ReviewEffects } from './reviews/review.effects';
import { reviewsReducer } from './reviews/review.reducer';
import { statisticsReducer } from './statistics/statistics.reducer';
import { StatisticsEffects } from './statistics/statistics.effects';
import {AppState} from "./types";

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true,
    syncCondition: (state: AppState) => {
      return state.users.saveUser;
    }
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  courses: courseReducer,
  modules: modulesReducer,
  lessons: lessonsReducer,
  reviews: reviewsReducer,
  statistics: statisticsReducer,
};

const effects = [
  UsersEffects, CategoriesEffects, SubcategoriesEffects,
  CourseEffects, ModulesEffects, LessonsEffects, ReviewEffects,
  StatisticsEffects
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
