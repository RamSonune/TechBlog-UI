import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';
import { BlogPost } from 'src/app/features/blog-post/models/blog-post.model';
import { BlogPostService } from 'src/app/features/blog-post/services/blog-post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  isVisible: boolean = true;
  private file?: File;
  fileName: string = '';
  title: string = '';
  blogImages$?: Observable<BlogImage[]>;
  blogPost? : BlogPost
  id?:string | null

  @ViewChild('form',{static:false}) imageUploadForm?:NgForm;
  //we are saying that there is form name ie #form in template 
  // give it a name of imageUploadForm and it is of type NgForm 

  constructor(private imageService: ImageService,
    private blogPostService:BlogPostService,
    private route : ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this will load our images present in the BlogImages db with the use of service.
    this.getImages();
    this.route.paramMap.subscribe(params=>{
      this.id=params.get('id');
    })
    if(this.id){
    this.blogPostService.getBlogPostById(this.id).subscribe({
      next:(resData)=>{
        this.blogPost = resData;
        console.log("the blog post is ",this.blogPost.title," url is ",this.blogPost.featuredImageUrl);
      }
    })
    }
  }

  toggleClick(): void {
    this.isVisible = false;
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0]; // so we are getting the first element from the files and giving it to the file
  }

  uploadImage(): void {
    if (this.file && this.fileName != '' && this.title != '') {
      // then use the image service , because in the API of the image it is mandatory to have those three fields
      this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            console.log('Form has been added and here is response', response);
            this.imageUploadForm?.resetForm();// this will remove fileName and title from the component
            this.getImages();
          },
        });
    }
  }

  // selectImage(url:string):void{
  //   console.log(url,'pic has been clicked')
  //   // when the image is selected we need to pass the url of the image to the blogpost.featured
  //   if(this.blogPost){
  //     this.blogPost.featuredImageUrl = url;
  //   }
  // }

  // above was the method we tried but it did not worked this is new one with the Behavior Subject
  selectImage(image:BlogImage):void {
    this.imageService.selectImage(image);
    // this will trigger a change in the image
  }

  private getImages() {
    this.blogImages$ = this.imageService.getAllImages();
    console.log('here are all the images', this.blogImages$);
  }
  // no need of this on because we are using [ngClass] in edit component
}
/*
@Write down the steps took to implement the SELECT IMAGE which will change the url of featuredImageUrl
remaining will write down soon after creation of JWT token - JWT Token has been created as well as tested 
WHAT TO DO NOW
1.Create HomePage component - 
@why it is important to give blogPOst urlHandle to open a new blog post from Home page and why we are not giving the GUID of blogs
2.Create BlogDetails Component - done
3.API for BlogDetails - done
4.Display BlogeDetails UI - doing
5.Write down the working of Image selector - remaining 
6.write down the steps that we have took to create the JWT token (we know the steps but for revision write it down) - rem

112,113,114 - 14 - 30
115,116,117 - 23 - 45
118,119,120 - 28 - 1
121,122,123 - 38 - 


JWT token will expire on 9:23PM on 25th of July
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJVc2VyMUBUZWNoYmxvZy5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZWFkZXIiLCJleHAiOjE3NTM0NTgzNTMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwNjgiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0MjAwIn0.mmL_anlFXXLCIS7h4C3al34PCb8NqSlO3MQRjL48KQg
 */