import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  loggedIn(data: any){
    let url = 'https://employee-deteils.herokuapp.com/loginUser';
    return this.http.post(url, data);



  }
}
