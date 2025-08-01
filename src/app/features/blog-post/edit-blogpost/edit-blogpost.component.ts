import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private imageService:ImageService
  ) {}

  // creating a model of BLogPost
  blogPost?: BlogPost;
  id: string | null = null;
  paramSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  blogPostSubscription?: Subscription
  updateBlogPostSubscription?:Subscription
  deleteBlogPostSubscription? : Subscription
  isImageSelectorVisible : boolean = false;
  imageSelectorSubscription?:Subscription;
  // updatedBlogPost?: UpdateBlogPost;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.paramSubscription = this.route.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id');
        // will get the id from the activated route ie the current route
      },
    });
    if (this.id !== null) {
      this.blogPostSubscription=this.blogPostService.getBlogPostById(this.id).subscribe({
        next: (resData) => {
          this.blogPost = resData;
          this.selectedCategories = resData.categories.map((x) => x.id);
          // so we are giving all the guid from categories to the selectedCategories
        },
      });
    }
    // getting the categories from service of category
    // now will update the featuredImageUrl when the image is selected from the Image selector
    this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
      next:(res)=>{
        if(this.blogPost){
          this.blogPost.featuredImageUrl = res.url;
          // updating the featuredImageUrl with the new Url which has just been updated by the user from the image selector
          this.isImageSelectorVisible =false;
        }
      }
    })
  }

  onFormSubmit(): void {
    // in this will subscribe to the service
    if (this.id && this.blogPost) {
      // we will need to assign everything from blogpost to the updated blog post
      var updatedBlogPost: UpdateBlogPost = {
        title: this.blogPost.title,
        shortDescription: this.blogPost.shortDescription,
        content: this.blogPost.content,
        featuredImageUrl: this.blogPost.featuredImageUrl,
        urlHandle: this.blogPost.urlHandle,
        author: this.blogPost.author,
        publishedDate: this.blogPost.publishedDate,
        isVisible: this.blogPost.isVisible,
        // categoryGuids : this.blogPost.categories.map(x=>x.id)
        categories: this.selectedCategories ?? []
      };
      console.log(updatedBlogPost)
      //calling the serive to update the blogpost
      this.updateBlogPostSubscription=this.blogPostService.updateBlogPost(this.id, updatedBlogPost).subscribe({
        next: (res) => {
          // updatedBlogPost = updatedBlogPostReq;
          // console.log(updatedBlogPost);
          // redirect to the list of blogs
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  deleteBlogPost():void{
    console.log("delete this blog:",this.blogPost);
    // first will write the API : API wrote down API is working fine, API demans the current id which is selected so sent that with the service
    if(this.id){
      this.deleteBlogPostSubscription=this.blogPostService.deleteBlogPost(this.id).subscribe({
        next:(res)=>{
          this.router.navigateByUrl('/admin/blogposts');
          // to test this on UI again will create a sample and then delete that sample
        }
      })
    }
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }
  closeImageSelector():void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.blogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }
}
/*
1.implement onInit 
2.create service to get the single blogpost
rest we have done and also done with the template but we need to get the Categories intothe UI so how are we going to do that

HOW TO FETCH THE CATEGORIES INTO THE UI
- there are categories in the blogpost but we cannot get that categoires from the blogpost 
- we will need to use the getCategories service method to get the categories, this categories will be saved into the categories$ observable.
- from this observable will get all this categories into the options.
<div class="mt-3">
        <label for="categories" class="form-label">Categories</label>
        <ng-container *ngIf="categories$ | async as categories">
          <select class="form-control" name="categories" id="categories" multiple [(ngModel)]="selectedCategories">
            <!-- select multiple is used to select the given multiple values
             thus this selectedCategories which has an array of GUIDs will be selected" -->
            <option *ngFor="let category of categories" [value]="category.id">
              {{category.name}}
            </option>
          </select>
        </ng-container>
      </div>
- we can see that in the options we are using loop to loop through the categories array and then print the category name, this will print all of the categories.
50% of the task is done now it is the time to select the categories of that respected blogpost which has been chosen
HOW TO SELECT THE CATEGORIES OF THAT RESPECTED BLOGPOST.
- the blogpost service method is actually having the selected categories, we just need to fetch the selectedCategories from them.
1.selectedCategories? : string[]
2.this.selectedCategories = resData.categories.map(x=>x.id);
- from the resData we are taking the categories and only mapping the guids to the selectedCategories.
this selectedCategories will be used to select the categories from the list of categories 
<select class="form-control" name="categories" id="categories" multiple [(ngModel)]="selectedCategories">

NOW WE NEED TO SEND THE EDITED BLOGPOST TO THE API, so 
1.will create a service which has param of updated object, id .
2.will subscribe to this service in the Save of edit, this will give the updated object to the backend.
3.API will get the updated object and the id, will find the corresponding blogpost from the given id, in that blogpost the values from the updated object will be assigned and then this be saved in the db.

 {
    "id": "137cc0e7-e8e1-44b4-267b-08ddc6d4b86b",
    "title": "categories",
    "shortDescription": "dsdfd",
    "content": "dfdfd",
    "featuredImageUrl": "https://images.pexels.com/photos/25539491/pexels-photo-25539491.jpeg",
    "urlHandle": "dfdx",
    "publishedDate": "2025-07-19T14:57:35.911",
    "author": "Ram3",
    "isVisible": false,
    "categories": [
      {
        "id": "d1491b55-9b0c-40cb-503f-08ddc393e36d",
        "name": "HTML",
        "urlHandle": "html-blogs"
      }
    ]
  }

   {
    "title": "categories-updated",
    "shortDescription": "dsdfd",
    "content": "dfdfd",
    "featuredImageUrl": "https://images.pexels.com/photos/25539491/pexels-photo-25539491.jpeg",
    "urlHandle": "dfdx",
    "publishedDate": "2025-07-19T14:57:35.911",
    "author": "Ram3-updated",
    "isVisible": true,
    "categories": ["d1491b55-9b0c-40cb-503f-08ddc393e36d"]
  }

  {
  "title":"categories-updated-again3",
  "shortDescription":"dsdfd",
  "content":"dfdfd",
  "featuredImageUrl":"https://images.pexels.com/photos/25539491/pexels-photo-25539491.jpeg",
  "urlHandle":"dfdx","author":"Ram3-updated-again3","publishedDate":"2025-07-19T14:57:35.911",
  "isVisible":true,
  "categoryGuids":["d1491b55-9b0c-40cb-503f-08ddc393e36d","a796047f-a0f6-4442-067e-08ddc3abe40a","6e281d73-6dc0-42f8-3906-08ddc47b12b2"]
  }
  // above is the data which is getting sent from the UI to the backend fetched from the payload but then also the data is not getting populated into the Categories 

  // Finally after 1 hour of debuggin got to know that what was the problem- will write down soon after the completion of delete 
@write down the problem of 

  id of css - A796047F-A0F6-4442-067E-08DDC3ABE40A

*/
