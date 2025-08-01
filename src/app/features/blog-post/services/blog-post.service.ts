import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  createBlogPost(request:AddBlogPost):Observable<BlogPost>{
    return this.http.post<BlogPost>(' https://localhost:7068/api/BlogPosts',request);
  }
  // since in the API :  public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDTO requestDTO) 
  // we need to give a createBlogPostRequestDTO, here in this service method should have a param which should have a request object to sent to the API.

  getAllBlogPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>('https://localhost:7068/api/BlogPosts');
    // this service will hit the API now what will the API return think 
    // API will return a list of blogPost
    // so the observable will be emitting out a stream of BlogPost array
    // and thus observable is returning BlogPost[]
    // now subscribe this one in blog-list component
  }

  getBlogPostById(id:string):Observable<BlogPost>{
    return this.http.get<BlogPost>('https://localhost:7068/api/BlogPosts/'+id);
  }

  getBlogPostByUrl(url:string):Observable<BlogPost>{
    return this.http.get<BlogPost>('https://localhost:7068/api/BlogPosts/'+url);
  }
  // fetching the blogpost from the urlHandle, this will return a Observable of BLogPost, now subscribe it

  updateBlogPost(id:string,updatedBlogPost : UpdateBlogPost):Observable<BlogPost>{
    return this.http.put<BlogPost>('https://localhost:7068/api/BlogPosts/'+id,updatedBlogPost);
  }
  // updateBlogPost model needed to be created because of the API

  deleteBlogPost(id:string):Observable<BlogPost>{
    return this.http.delete<BlogPost>('https://localhost:7068/api/BlogPosts/'+id);
  }

}
