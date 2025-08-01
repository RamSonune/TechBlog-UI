import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { BlogPostService } from '../../blog-post/services/blog-post.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  url?:string | null;
  blogPostObservable$? : Observable<BlogPost>;

  constructor(private route:ActivatedRoute,
    private blogPostService : BlogPostService
  ){}

  ngOnInit(): void {
    // with the use of route fetch the url handle
    this.route.paramMap.subscribe({
      next:(res)=>{
        this.url=res.get('url');
      }
    })
    // fetching the blogpost by url 
    if(this.url)
    this.blogPostObservable$ = this.blogPostService.getBlogPostByUrl(this.url);
  }
}
/*
now since we are able to fetch the url, now we need to fetch the whole BlogPost based on that url
1.Just now created the API now it is time to create service 
- so our API takes a param of urlHanlde along with the baseUrl, create the service accordingly
- this service will emit a blogPost so return type of servie will be a blogPost.

*/
