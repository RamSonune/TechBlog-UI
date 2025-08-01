export interface UpdateBlogPost
{
    title:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
    categories:string[];
    // because the Ui is going to send the guid ids 
}