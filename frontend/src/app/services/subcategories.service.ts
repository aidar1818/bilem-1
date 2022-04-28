import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { CreateSubcategoryData, Subcategory } from '../models/subcategory.model';
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

  getSubcategoryById(id: string) {
    return this.http.get<Subcategory | null>(env.apiUrl + '/subcategories/' + id);
  }

  createSubcategory(subcategoryData: CreateSubcategoryData) {
    return this.http.post<Subcategory>(env.apiUrl + '/subcategories', subcategoryData);
  }

  editSubcategory(id: string, change: {title: string}) {
    return this.http.put<Subcategory>(env.apiUrl + '/subcategories/' + id, change);
  }

  deleteSubcategory(id: string) {
    return this.http.delete(env.apiUrl + '/subcategories/' + id)
  }
}
