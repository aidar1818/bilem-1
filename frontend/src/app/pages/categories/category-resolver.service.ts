import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryResolverService implements Resolve<Category> {

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> | Observable<never> {
    const categoryId = <string>route.params['id'];

    return this.categoriesService.getCategoryById(categoryId).pipe(mergeMap(category => {
      if (category) {
        return of(category);
      }

      void this.router.navigate(['/']);
      return EMPTY;
    }));
  }
}
