import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Customer {
  http = inject(HttpClient);

  getNewProducts() {
    return this.http.get<Product[]>(environment.apiUrl+'/customer/new');
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(environment.apiUrl+'/customer/featured');
  }
  getcategories() {
    return this.http.get<Product[]>(environment.apiUrl+'/customer/categories');
  }
getproducts(searchQuery: { searchterm: string; categoryID: string; sortby: string; sortOrder: number; brandID: string }) {
  return this.http.get<Product[]>(
    `${environment.apiUrl}/customer/products?searchterm=${searchQuery.searchterm}&categoryID=${searchQuery.categoryID}&sortby=${searchQuery.sortby}&sortorder=${searchQuery.sortOrder}&brandID=${searchQuery.brandID}`,
    {}
  );
}
}
