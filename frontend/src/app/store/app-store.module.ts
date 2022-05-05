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

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  courses: courseReducer,
  modules: modulesReducer,
  lessons: lessonsReducer
};

const effects = [UsersEffects, CategoriesEffects, SubcategoriesEffects, CourseEffects, ModulesEffects, LessonsEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
