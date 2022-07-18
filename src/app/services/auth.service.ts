import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login, Register } from '../@model/auth.model'

environment
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  IsLoggedIn(){
    let bool: boolean;
    const token = localStorage.getItem('key');
    if(token) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }

  register(Register: any){
    return this.http.post(`${environment.url}/customer/signup`, Register)
  }

  login(Login: any){
    return this.http.post(`${environment.url}/auth/login`, Login)
  }
}
