import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../types/category';
import { environment } from '../../environments/environment'; // ✅ import environment

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  // Get all categories
  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(`${environment.apiUrl}/category`);
  }

  // Get category by ID
  getCategoriesById(id: string): Observable<category> {
    return this.http.get<category>(`${environment.apiUrl}/category/${id}`);
  }

  // Add new category
  addCategory(name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/category`, { name });
  }

  // Update category
  updateCategory(id: string, model: { name: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/category/${id}`, model);
  }

  // Delete category
  deleteCategoryByID(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/category/${id}`);
  }
}
