import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendenceComponent } from './attendence/attendence.component';
import { Attendence1Component } from './attendence1/attendence1.component';
import { EmployeeComponent } from './employee/employee.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:"employee", component:EmployeeComponent,
    canActivate: [AuthGuard]
  },

  // {
  //   path:"attendence", component:AttendenceComponent,
  //   canActivate: [AuthGuard]
  // },

  {
    path:"attendence1", component:Attendence1Component,
    canActivate: [AuthGuard]
  },

  {
    path:"leave", component:LeaveComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"expenses", component:ExpensesComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"**", component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
