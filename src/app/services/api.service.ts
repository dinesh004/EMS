import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }


  login = "https://employee-deteils.herokuapp.com/loginUser"


  postEmployee(data:any){
    return this.http.post<any>("https://employee-deteils.herokuapp.com/create", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>("https://employee-deteils.herokuapp.com/getEmployee").pipe(map((res:any)=>{
      return res;
    }))
  }

  putEmployee(data: any, id: number){
    return this.http.put<any>("https://employee-deteils.herokuapp.com/updateEmploye?employeId="+id ,data)
  }


  deleteEmployee(id: number){
    return this.http.delete<any>("https://employee-deteils.herokuapp.com/delete?employeId="+id)
  }






                //  Leave_API


  // postLeave(id :any,data: any):Observable<any>{
  //   return this.http.post("https://employee-deteils.herokuapp.com/createLeave/"+ id, data).pipe(map((res:any)=>{
  //     return res
  //   }))
  // }

  postLeave(data:any, id: number){
    return this.http.post<any>("https://employee-deteils.herokuapp.com/createLeave?employeId"+id,data).pipe(map((res:any)=>{
      return res
    }))
  }


  getLeave(){
    return this.http.get<any>("https://employee-deteils.herokuapp.com/getLeave").pipe(map((res:any)=>{
      return res;
    }))
  }


  putLeave(data: any, id: number){
    return this.http.put<any>("https://employee-deteils.herokuapp.com/updateLeave?leaveId="+id ,data)
  }


  deleteLeave(id: number){
    return this.http.delete<any>("https://employee-deteils.herokuapp.com/deleteLeaveIdById?leaveId="+id)
  }





//  Expenses_API


  // postExpense(id :any,data: any):Observable<any>{
  //   return this.http.post("https://employee-deteils.herokuapp.com/createLeave/"+ id, data).pipe(map((res:any)=>{
  //     return res
  //   }))
  // }

  postExpense(data:any){
    return this.http.post<any>("https://employee-deteils.herokuapp.com/createExpense", data).pipe(map((res:any)=>{
      return res
    }))
  }


  getExpense(){
    return this.http.get<any>("https://employee-deteils.herokuapp.com/getExpenseData").pipe(map((res:any)=>{
      return res;
    }))
  }


  putExpense(data: any, id: number){
    return this.http.put<any>("https://employee-deteils.herokuapp.com/updateExpenseData?expenseId="+id, data)
  }


  deleteExpense(id: number){
    return this.http.delete<any>("https://employee-deteils.herokuapp.com/deleteExpense?expenseId="+id)
  }










  postAttendaceByDate(data: any){
  return this.http.post<any>("https://employee-deteils.herokuapp.com/attendanceCreate", data).pipe(map((res:any)=>{
    return res;
  }))
}

getAttendace(){
  return this.http.get<any>("https://employee-deteils.herokuapp.com/getAttendaceByDate?date=").pipe(map((res:any)=>{
    return res;
  }))
}


deleteAttendance(id: number){
  return this.http.delete<any>("https://employee-deteils.herokuapp.com/deleteAttendanceById?attendanceId="+id)
}



putAttendace(data: any, id: number){
  return this.http.put<any>("https://employee-deteils.herokuapp.com/update?date="+id, data)
}




  getDataIn(){
    return this.http.get(this.login);
  }



}
