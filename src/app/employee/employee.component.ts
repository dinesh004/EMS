import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpHeaders } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'phone', 'joiningDate', 'contract', 'wfoWfh', 'assets', 'salary', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService,
    private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
    width:'30%'
     }).afterClosed().subscribe(val=>{
       if(val === 'save'){
         this.getAllEmployee();
       }
     })
  }


    getAllEmployee(){
      this.api.getEmployee()
      .subscribe({

        next:(res)=>{
          this.dataSource = new MatTableDataSource(res.data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort

        },
        error:(err)=>{
          this.toast.error({detail:"Error Message", summary:"Error While Fetching The Records!!", duration:5000})
        }
      })
    }


    editEmployee(row: any){
      this.dialog.open(DialogComponent,{
        width: '30%',
        data: row
      }).afterClosed().subscribe(val=>{
        if(val==='update'){
          this.getAllEmployee();
        }
      })
    }


    deleteAllEmployee(id: number){
      console.log(id);

      this.api.deleteEmployee(id)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message", summary:"Employee Data Delete Successfully", duration:5000})
          this.getAllEmployee();
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Error while deleting the employee!!", duration:5000})
        }
      })
    }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }


}
