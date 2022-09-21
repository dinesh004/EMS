import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { LeaveComponent } from './leave/leave.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { Dialog1Component } from './dialog1/dialog1.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { DialogExpenseComponent } from './dialog-expense/dialog-expense.component';
import { NgToastModule } from 'ng-angular-popup';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { DialogAttendenceComponent } from './dialog-attendence/dialog-attendence.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { Attendence1Component } from './attendence1/attendence1.component';
import { AttendenceUpdateComponent } from './attendence-update/attendence-update.component';
// import { MatMomentDateModule } from '@angular/material-moment-adapter'


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AttendenceComponent,
    LeaveComponent,
    ExpensesComponent,
    DialogComponent,
    LoginComponent,
    Dialog1Component,
    DialogExpenseComponent,
    DialogAttendenceComponent,
    Attendence1Component,
    AttendenceUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,

    // material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    // MatMomentDateModule,

    NgToastModule,
    AngularFileUploaderModule,
    Daterangepicker

  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  MatDatepickerModule,
  MatNativeDateModule
  // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
