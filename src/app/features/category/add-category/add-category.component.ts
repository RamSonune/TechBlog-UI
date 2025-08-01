import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model:AddCategoryRequest;
  private addCategorySubscription? : Subscription;
  // if there is the error of has no Initializer and we dont know what value to initialize it then just give it as undefined
  constructor(private categoryService:CategoryService,private router:Router){
    this.model = {
      name:'',
      urlHandle:''
    }
  }

  // we are able to see this name on the UI because we have bind it with the use of ngModel

  onFormSubmit(){
    // console.log(this.model)
    // when we are submiting the form with the use of service we will sent the data to the external .net api by subscribing to it
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
      next:(res)=>{
        console.log('The post has been added');
        this.router.navigateByUrl('/admin/categories');
        // on the success of formSubmit will redirect the user to the category list

      }
    })
  }

    ngOnDestroy(): void {
      this.addCategorySubscription?.unsubscribe(); // unsubscribing the subscription to save our memory and avoid unwanted ghosted of unwanted values, 
      // when the component will be destroyed the service too will be unsubscribed thus the service will not get any observable stream.
  }

}
// this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
// in above code we are assigning the method to a variable of addCategorySubscription that we have created
