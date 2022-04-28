import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subcategory } from '../../models/subcategory.model';
import { SubcategoriesService } from '../../services/subcategories.service';

@Injectable({
  providedIn: 'root'
})

export class SubcategoryResolverService implements Resolve<Subcategory> {

  constructor(
    private router: Router,
    private subcategoriesService: SubcategoriesService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subcategory> | Observable<never> {
    const subcategoryId = <string>route.params['id'];

    return this.subcategoriesService.getSubcategoryById(subcategoryId).pipe(mergeMap(subcategory => {
      if (subcategory) {
        return of(subcategory);
      }

      void this.router.navigate(['/']);
      return EMPTY;
    }));
  }
}