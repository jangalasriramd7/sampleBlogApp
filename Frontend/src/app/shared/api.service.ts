import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = 'http://localhost:3000/postApi'
  constructor(private http:HttpClient) { }

  //get all posts

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.url);
  }

  //get post data by Id
  getPostById(id:string):Observable<Post>{
    return this.http.get<Post>(this.url + '/' + id);
  }

  //delete post

  deletePost(id:string):Observable<Post>{
    return this.http.delete<Post>(this.url + '/' + id);
  }

  //create post
  createPost(post:Post):Observable<Post>{
    return this.http.post<Post>(this.url + '/create/', post);
  }

  //update post
  updatePost(post:Post):Observable<Post>{
    return this.http.put<Post>(this.url + '/update/' + post._id, post);
  }
}
