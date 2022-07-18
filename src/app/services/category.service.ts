import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../@model/category.model'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  category(){
    return this.http.get(`${environment.vendor}/api/productCategory/list`)
  }

  createCategory(Category: any){
    let params = new HttpParams()
    .set('Name', Category.Name)
    .set('Description', Category.Description)
    .set('CreatedBy', Category.CreatedBy)
    return this.http.post(`${environment.vendor}/api/productCategory/add`, params)
  }

  updateCategory(category: any) {
    let params = new HttpParams()
      .set("Id", category.Id)
      .set('Name', category.Name)
      .set('Description', category.Description)  
      .set('ModifiedBy', category.ModifiedBy)
    return this.http.patch<any>(`${environment.vendor}/api/ProductCategory/update`, params)
  }
}
