import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  employeeIn(data: any){
    let url = 'https://ff72-2405-201-200b-505e-999-e8ca-8733-9e9d.in.ngrok.io/getEmployee';
    return this.http.get(url, data);



  }
}
