import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Customer {
  http = inject(HttpClient);

  // 🧩 Common function to attach token if available
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // or sessionStorage
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getNewProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/new`);
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/featured`);
  }

  getcategories() {
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/categories`);
  }

  getproducts(searchQuery: { searchterm: string; categoryID: string; sortby: string; sortOrder: number; brandID: string }) {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/customer/products?searchterm=${searchQuery.searchterm}&categoryID=${searchQuery.categoryID}&sortby=${searchQuery.sortby}&sortorder=${searchQuery.sortOrder}&brandID=${searchQuery.brandID}`
    );
  }

  // ✅ Now includes Authorization header for secure route
  getProductById(id: string) {
    const headers = this.getAuthHeaders();
    return this.http.get<Product>(`${environment.apiUrl}/customer/product/${id}`, { headers });
  }
}
