import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  readonly userApiUrl = "https://localhost:7171/api";

  constructor(private http:HttpClient) { }

  //Crud Users

  getUserList():Observable<any[]>{

    return this.http.get<any>(this.userApiUrl + '/Users');
  } 

  addUser(data:any){
    return this.http.post(this.userApiUrl + '/Users', data);
  }

  updateUser(id:number| String, data:any){
    return this.http.put(this.userApiUrl + `/Users/${id}`, data);    
  }

  deleteUser(id:number|string) {
    return this.http.delete(this.userApiUrl + `/Users/${id}`);
  }

  //list User Gender

  
  getUserGendersList():Observable<any[]>{

    return this.http.get<any>(this.userApiUrl + '/userGenders');
  } 
}
