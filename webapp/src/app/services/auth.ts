import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Register } from '../components/register/register';
import { environment } from '../../environments/environment';
import { Login } from '../components/login/login';

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
login( email:string,password:string){
  return this.HttpClient.post(environment.apiUrl+'/auth/login',{
    email,password
  });
}



}
