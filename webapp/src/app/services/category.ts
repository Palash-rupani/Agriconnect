import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../types/category'; // ✅ correct type

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategories(): Observable<category[]> {
    return this.http.get<category[]>('http://localhost:3000/category');
  }

  getCategoriesById(id: string): Observable<category> {
    return this.http.get<category>('http://localhost:3000/category/' + id);
  }

  addCategory(name: string): Observable<any> {
    return this.http.post('http://localhost:3000/category', { name: name });
  }

  updateCategory(id: string, model: { name: string }): Observable<any> {
    return this.http.put('http://localhost:3000/category/' + id, model);
  }

  deleteCategoryByID(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/category/' + id);
  }
}
