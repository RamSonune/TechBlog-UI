export interface AddBlogPost{
    title:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
    categories:string[];
    //when the admin will be creting the blogpost they will need to add categories
}
// this is the model for BlogPost , this will take all the values given by the user and then will be passed on to the services then to the API, in API there is a DTO which has all this corresponding properties, based on that DTO only we have created this