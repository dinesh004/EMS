import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Dialog1Component } from '../dialog1/dialog1.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  displayedColumns: string[] = ['name', 'fromDate', 'toDate', 'remark', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService,
    private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllLeave();
  }

  openDialog() {
    this.dialog.open(Dialog1Component, {
    width:'30%'
     }).afterClosed().subscribe(val=>{
       if(val === 'save'){
         this.getAllLeave();
       }
     })
  }


    getAllLeave(){
      this.api.getLeave()
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


    editLeave(row: any){
      this.dialog.open(Dialog1Component,{
        width: '30%',
        data: row
      }).afterClosed().subscribe(val=>{
        if(val==='update'){
          this.getAllLeave();
        }
      })
    }


    deleteAllLeave(id: number){
      this.api.deleteLeave(id)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message", summary:"Leave Data Delete Successfully", duration:5000})
          this.getAllLeave();
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Error while deleting the leave!!", duration:5000})
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
