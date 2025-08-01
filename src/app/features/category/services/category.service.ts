import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../../models/add-category-request.model';
import { Category } from '../../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private cookieService:CookieService) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    // return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`,model);
    return this.http.post<void>('https://localhost:7068/api/categories',model);
  }
  // here Observable will return a CategoryResponse which will also have a id in it, so I guess we need to create a new interface
  getAllCategories():Observable<Category[]>{
    // return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
    return this.http.get<Category[]>('https://localhost:7068/api/Categories');
  }
  // service to get a single category 
  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>('https://localhost:7068/api/Categories/'+id)
    // return this.http.get<Category>('https://localhost:7068/api/Categories'+id)
    // first in our service we forgot to give the / between categories and id and because of that 
    // the service which was getting sent to the API was not able to fetch the correct single category 
    // and thus we were getting the error of 404 , once investigating the network the problem got resolved
  }

  //service to give updated category to the API 
  // updateCategoryById(id:string,category:Category):Observable<void>{
  //   return this.http.put<void>('https://localhost:7068/api/Categories/'+id,category);
    // we cannot use Category to pass because id is disabled when we are taking the input from the user
    // and for a clean code app we need to create a new Model for UpdateRequestCategory -> so create a new model for it
    updateCategoryById(id:string,updateCategoryRequest:UpdateCategoryRequest):Observable<Category>{
    return this.http.put<Category>('https://localhost:7068/api/Categories/'+id,updateCategoryRequest,{
      headers:{
        'Authorization':this.cookieService.get('Authorization')
      }
      // adding the headers so that token is passed to the authorized API calls
    });
  }

  // service to delete the category, to delete we need to pass the id and return type of service will be Category
  deleteCategory(id:string):Observable<Category>{
    return this.http.delete<Category>('https://localhost:7068/api/Categories/'+id)
  }
}

// the path of this project is : F:\TechBlog\UI\techblog
/*
create - from UI we are passing an object and returning nothing in except 
addCategory(model:AddCategoryRequest):Observable<void>{
- param having object since we are passing an object to the API and in return we dont except anything thus Observable is emitting void BUT sometimes this Observable may return anything as per business requirement

read- we need to get a LIST of objects from the API 
getAllCategories():Observable<Category[]>{
- param is empty since we are not giving anything to the API when there is READ 
- Observable is emtting a list of object thus we can subscribe to it and iterate through it and display content over the page 
- this observable is representing that the API is giving us A list of objects and also represent that we are giving a list of object to the API too 
@what does the return value of Observable means to us
- that the returning values will be used in subsribe method 
- this returning value will be returned also to the API
- MAY BE not sure - in observable we return values which are the return types from the API.
for eg 
READ - in read API returns a list of objects AND in Read of service observable is also returnign an array of object 
EDIT - in this API returns an updated object AND in service of edit observable is also returning an object.

update - we need to give id and updated object to the API, API will take the id, updated object , id will be used to find the object to update and updated object will be used to assign the value from updated object to the object found with the given id
now the API will return that updated object back to the UI.
updateCategoryById(id:string,updateCategoryRequest:UpdateCategoryRequest):Observable<Category>{
param - we are giving id and updated object 
return - returning a category since we are getting a updated object back from the UI.

delete - we need to pass a id, so API will find the object from the id and delete it.
deleteCategory(id:string):Observable<Category>{
param - id 
return - an object of Category but this is not that required.

create - pass the object get the object / pass the object and get void 
read - pass nothing and get the list of object 
update - pass id and updated object and get an updated object 
delete - pass the id and get the object / pass the id and get void

*/
