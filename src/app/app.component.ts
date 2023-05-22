import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.module';
import { HttpserviceService } from './httpservice.service';
import { Subscription } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // endPointURL:string = 'https://angular-bes-default-rtdb.asia-southeast1.firebasedatabase.app/';
  // postURL:string = this.endPointURL+'post.json';
  loadedPosts = [];
  showLoading = false;

  id:string = '';
  title:string='';
  content:string='';

  constructor(private httpService: HttpserviceService) {}

  //constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
    this.errorSub = this.httpService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.httpService.onCreatePost(postData);
  }

  onUpdatePost(updateData:Post) {
    this.httpService.onUpdatePost(updateData);
  }

  onClickData(updateData:Post){
    this.id = updateData.id;
    this.title = updateData.title;
    this.content = updateData.content;
  }

  error = null;  
  errorSub: Subscription;
  public fetchPosts(){

    this.showLoading = true;
    this.httpService.fetchPosts()
    .subscribe(
      posts => {
        this.showLoading = false;
        this.loadedPosts = posts;
      },
      error => {
        console.log(error);     
        this.error = error;  
      }
    )
  }

  onClearPosts() {
    // Send Http request
    this.showLoading = true;
    this.httpService.deletePosts().subscribe(
      (data) => {
        this.showLoading = false;
        this.loadedPosts = [];
      }
    )
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }
  
}
