import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.module';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  endPointURL:string = 'https://angular-bes-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL:string = this.endPointURL+'post.json';

  errorHandling = new Subject<any> ();

  constructor(private http: HttpClient) {}

  onCreatePost(postData: Post) {
    // Send Http request

    this.http.post<{name:string}>(this.postURL, postData).subscribe(
      (data) => {
        console.log(data);
        this.errorHandling.next(null);
      },
      (error) => {
        this.errorHandling.next(error);
      }
    );
  }

  onUpdatePost(updateData:Post) {
    let data = {[updateData.id]: { title: updateData.title, content: updateData.content }};

    this.http.patch(this.postURL, data).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
  
  fetchPosts(){
 
    let customParam = new HttpParams();
    customParam = customParam.append('print','pretty');
    customParam = customParam.append('custom-param', 'custom-param-value');

    return this.http.get<{[key:string] : Post}>(this.postURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header'
      }),params: customParam,

    })
    .pipe(
      map( responseData => {
        const postArray : Post [] = [];
        for( const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key],id:key})
          }
        }
        return postArray;
      }),
      catchError(
        errorRes => {
          return throwError(errorRes)
        }
      )
    );
  }

  deletePosts(){
    return this.http.delete(this.postURL);
  }
}
