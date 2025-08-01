import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy,OnInit {
  
  createBlogPostService?: Subscription;
  categories$? : Observable<Category[]>;
  isImageSelectorVisible : boolean = false;

  // creating the model 
  model: AddBlogPost;// assigning this in the constructor 
  constructor(private blogPostService:BlogPostService,private router:Router,private categoryService:CategoryService,private imageService:ImageService){
    this.model = {
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate: new Date(),
      categories:[]
    }
  }
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    // getting the categories and storing it into observable now we need to display them in template

    // here will need to subscribe to the imageService 
    this.imageService.onSelectImage().subscribe({
      next:(res)=>{
        this.model.featuredImageUrl = res.url;
        // this will give url to the featuredImageUrl
        this.isImageSelectorVisible = false;
      }
    })
  }

  openImageSelector(){
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(){
    this.isImageSelectorVisible =  false;
  }
  

  onFormSubmit():void {
    console.log(this.model)
    this.createBlogPostService = this.blogPostService.createBlogPost(this.model).subscribe({
      next:(res)=>{
        console.log("Blog Post has been added into the DB")
        this.router.navigateByUrl('admin/blogposts');
      }
    })
  }
  // assigning model in the constructor since we cannot give a nullable model
  ngOnDestroy(): void {
    this.createBlogPostService?.unsubscribe();
  }

}
/*
1.
2.since the model is having all the initial values and we have also created the service now we need to subscribe to the service on the onFormSUbmit
-create the service in the constructor 
- onFormSubmit subscribe the service 
- for the response we need to route to the list of blog post - create router in constructor - in res router.navigateByUrl to redirect to the list of blogs - to get the url get the url from the app.routing.module.ts
- create a variable of Subscription and assign the service.
- implement OnDestroy to unsubscribe the service on ngOnDestroy


*/