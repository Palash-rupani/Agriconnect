import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private http = inject(HttpClient);

  // Get all brands
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.apiUrl}/brands`);
  }

  // Get a single brand by ID (preload for edit)
  getBrandsById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${environment.apiUrl}/brands/${id}`);
  }

  // Add a new brand
  addBrands(name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/brands`, { name });
  }

  // Update an existing brand
  updateBrands(id: string, model: { name: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/brands/${id}`, model);
  }

  // Delete a brand
  deleteBrandsByID(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/brands/${id}`);
  }
}
