import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class Productservice {
  http=inject(HttpClient);

  getallproducts(){
    return this.http.get<Product[]>(environment.apiUrl+'/product');
  }
   getallproductbyid(id:string){
    return this.http.get<Product>(environment.apiUrl+'/product/'+id);
   }

   addproduct(model:Product){
    return this.http.post(environment.apiUrl+'/product',model);
   }

   updateproduct(id:string,model:Product){
    return this.http.put(environment.apiUrl+'/product/'+id,model);
   }

    deleteproduct(id:string){
      return this.http.delete(environment.apiUrl+'/product/'+id);
    }


}
