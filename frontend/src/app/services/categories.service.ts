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

  getCategoryById(id: string) {
    return this.http.get<Category | null>(env.apiUrl + '/categories/' + id);
  }

  fetchCategoryById(id: string) {
    return this.http.get<Category>(env.apiUrl + '/categories/' + id);
  }

  createNewCategory(categoryData: CreateCategoryData) {
    return this.http.post<Category>(env.apiUrl + '/categories', categoryData);
  }

  editCategory(id: string, change: {title: string}) {
    return this.http.put<Category>(env.apiUrl + '/categories/' + id, change);
  }

  deleteCategory(id: string) {
    return this.http.delete(env.apiUrl + '/categories/' + id)
  }
}
