export interface UpdateCategoryRequest{
    name:string;
    urlHandle:string;
}
// this is the model created for the Update - category, this object will be populated with name and string 
// and will be passed to the API to update the category in the db, updation of category will be handled by the API