export interface Category{
    id:string,
    name:string,
    urlHandle:string
}
// when we are getting the list of categories from the .net API at that time the return type is of CategoryDTO and this 
// CategoryDTo has three props of id,name and urlHandle so to capture those three props we are creating this model where we have given three props
// we will capture the response of CategoryDTO using service and then assign that response values to this id,name and urlHandle of category.model.ts