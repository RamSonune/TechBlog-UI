import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../../models/category.model';
import { UpdateCategoryRequest } from '../../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?:Subscription;
  category?: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        // in params we have passed id because in params we can access the value of the route
        // and from the route we want to access the value of id, so given id
        // paramMap is a observable method and because of that we need to subscribe it

        // this.categoryService.getCategory(this.id)
        // because of the above problem we are checking first if id is not null
        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (singleCategoryData) => {
              this.category = singleCategoryData;
            },
          });
        }
      },
    });
  }
  onFormSubmit(): void {
    console.log('Updated category is', this.category);
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
    // now pass this updateCategoryRequest to the service
    if (this.id) {
      this.editCategorySubscription = this.categoryService
        .updateCategoryById(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            // if edit is working then redirect the user to the admin/categories
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
  }

  onDelete():void {
    console.log('we need to delete this ', this.category);
    if (this.id) {
      this.deleteCategorySubscription=this.categoryService.deleteCategory(this.id).subscribe({
        next:(res)=>{
          // once deleted then redirect to the list of categories
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
    // over here will subscribe to the method which will pass the id to the API whose category we need to delete
  }

  ngOnDestroy(): void {
    // will unsubscribe the subscription once destroyed
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }
}
/*
Write down all the process of how are we getting the selected Category populated on this Component's template once we click on
the EDIT button of the category from the list of the category



*/
