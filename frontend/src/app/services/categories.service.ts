import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CreateCategoryData } from '../models/category.model';
import { environment as env } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(env.apiUrl + '/categories')
  }

  createNewCategory(categoryData: CreateCategoryData) {
    return this.http.post<Category>(env.apiUrl + '/categories', categoryData);
  }

  deleteCategory(id: string) {
    return this.http.delete(env.apiUrl + '/categories/' + id)
  }
}
