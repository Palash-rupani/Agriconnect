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

 getname(){
  let userdata=localStorage.getItem('user');
  if(userdata){
    let user=JSON.parse(userdata);
    return user.name;
  }
  return null;
 }
 isloggedin(){
  let token=localStorage.getItem('token');
  return token!=null;
 }
 logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isFarmer');
 }
 isAdmin(){
  let userdata=localStorage.getItem('user');
  if(userdata){
    let user=JSON.parse(userdata);
    return user.isAdmin;
  }
  return false;
 }
 getmail(){
  let userdata=localStorage.getItem('user');
  if(userdata){
    let user=JSON.parse(userdata);
    return user.email;
  }
  return null;
 }
}
