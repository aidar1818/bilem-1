import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Subcategory } from '../models/subcategory.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  is_free!: boolean;

  constructor(private http: HttpClient) { }

  getSubcategories(id: string) {
    return this.http.get<Subcategory[]>(env.apiUrl + `/subcategories?category=${id}`).pipe(
      map(response => {
        return response.map(subcategory => {
          return new Subcategory(
            subcategory._id,
            subcategory.category,
            subcategory.title,
            subcategory.description,
          )
        })
      })
    );
  }

  // createNewCategory(categoryData: CreateCategoryData) {
  //   return this.http.post<Category>(env.apiUrl + '/categories', categoryData);
  // }
  //
  // deleteCategory(id: string) {
  //   return this.http.delete(env.apiUrl + '/categories/' + id)
  // }
}
