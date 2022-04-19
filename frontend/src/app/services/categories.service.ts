import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CreateCategoryData } from '../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/categories');
  }

  createNewCategory(categoryData: CreateCategoryData) {
    return this.http.post<Category>(environment.apiUrl + '/categories', categoryData);
  }
}
