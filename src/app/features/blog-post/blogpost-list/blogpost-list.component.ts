import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  constructor(private blogPostService:BlogPostService){}

  blogPosts$? : Observable<BlogPost[]>

  ngOnInit(): void {
    // here call the service
    // will not use the normal service
    // this.blogPostService.getAllBlogPosts().subscribe({
    //   next:(blogPostData)=>{
    //     this.blogPosts = blogPostData;
    //     // the observable stream is emitting a list of blogs 
    //     // so we subscribe it ang assigning that list of blogs (here named blogPostData) to the blogPosts array
    //     // now we can iterate through this array 
    //   }
    // })
    // will not use normal service instead using async service
    this.blogPosts$=this.blogPostService.getAllBlogPosts();
  }

}
