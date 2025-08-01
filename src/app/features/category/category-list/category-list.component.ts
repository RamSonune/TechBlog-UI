import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // categories? : Category[]
  // creating observable of categories array  
  categories$? : Observable<Category[]>

  constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
    // to implement the async pipe we are not going to use the subscribe method 
    /*
    this.categoryService.getAllCategories()
    .subscribe({
      next:(response)=>{
        this.categories = response;
        // assigning the list of categories(which is present in the response) to the categories variable that we have created
      },
      error:(err)=>{
        console.log("Adn the error is ",err)
      }
    }
    )
    */
    // to implement the async pipe we are not going to use the subscribe method

    //using async pipe
    this.categories$ = this.categoryService.getAllCategories();
    // only this much is needed ie assigning the service to the categories observable array now go to  the template
    //using async pipe
  }
// here we are going to display the list of categories so we will use the ngOnit and will subscribe to the service method of getCategories
}
