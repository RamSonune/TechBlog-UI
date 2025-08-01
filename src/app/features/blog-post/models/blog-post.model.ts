import { Category } from "../../models/category.model";

export interface BlogPost{
    id:string;
    title:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
    categories : Category[];
    // since we are getting the array of categories from the API
}
// this is the blogPost that we are returning from the UI to the API when the blog post is created and
// since we are returning it after the creation we are sending the id also.