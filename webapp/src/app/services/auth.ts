import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Register } from '../components/register/register';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  HttpClient=inject(HttpClient);

register(name:string,email:string,password:string,isFarmer:boolean){
  return this.HttpClient.post(environment.apiUrl+'/auth/register',{
    name,email,password,isFarmer
  });
}


}
