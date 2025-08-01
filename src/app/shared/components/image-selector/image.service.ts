import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage:BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id : '',
    fileExtension : '',
    fileName : '',
    title : '',
    url : ''
  });

  constructor(private http:HttpClient) { }

  uploadImage(file:File,fileName:string,title:string):Observable<BlogImage>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('fileName',fileName);
    formData.append('title',title);

    return this.http.post<BlogImage>('https://localhost:7068/api/images',formData);
  }
  // service to get all images
  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>('https://localhost:7068/api/images');
  }

  // behavior subject wala
  selectImage(image:BlogImage):void{
    this.selectedImage.next(image);
    // next will be used to emit the new values , so we are going to emit new values of BlogImage 
  }
  
  // this method will be subscribed by the Edit or Add component if they want the BlogImage if any changes are made to it.
  onSelectImage():Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }
}
