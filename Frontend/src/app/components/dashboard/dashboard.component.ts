import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  post: Post = {
    _id: '',
    title:'',
    content:'',
    username:''
  };
  _id: string = '';
  title: string = '';
  content: string = '';
  username: string='';

  allPosts: Post[] = [];

  constructor(private api: ApiService){}

  ngOnInit(): void {
    this._id = '';
      this.title = '';
      this.content = '';
      this.username = '';
      this.getAllPosts();
  }

  //get all data subscribe
  getAllPosts(){
    this.api.getAllPosts().subscribe(res => {
      this.allPosts = res;
    },err => {
      console.log(err);
    });
  }

  //get Data subscribe
  getPost(post:Post){
    this.api.getPostById(post._id).subscribe(res => {
      post = res;
    },err=>{
      console.log(err);
    });
  }

  //delete data subscribe
  deletePost(post:Post){
    if(window.confirm('Are you sure want to delete this data id: ' + post._id)){
      this.api.deletePost(post._id).subscribe(res => {
        console.log("Deleted");
        this.allPosts = [];
        this.ngOnInit();
      },err => {
        console.log(err);
      })
    }
  }

  //create post data subscribe
  createPostData(){
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;
    this.api.createPost(this.post).subscribe(res => {
      this.allPosts = [];
      this.getAllPosts();
    },err => {
      console.log(err);
    })
  }

  //update post data subscribe
  editPostData(post:Post){
    this.getPost(post);
    this._id = post._id;
    this.title = post.title;
    this.content = post.content;
    this.username = post.username;
  }

  updatePost(){
    if(this.title == '' || this.content == '' || this.username == ''){
      alert('Please fill all the values on fields');
      return;
    }
  
    this.post._id = this._id;
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;
    console.log("ID : " + this.post._id);
    this.api.updatePost(this.post).subscribe(res => {
      this.ngOnInit();
    },err => {
      console.log(err)
    })
  }

}
