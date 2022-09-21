import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAttendenceComponent } from '../dialog-attendence/dialog-attendence.component';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgToastService } from 'ng-angular-popup';
import { AttendenceUpdateComponent } from '../attendence-update/attendence-update.component';
import { AttendenceComponent } from '../attendence/attendence.component';

@Component({
  selector: 'app-attendence1',
  templateUrl: './attendence1.component.html',
  styleUrls: ['./attendence1.component.scss']
})

export class Attendence1Component implements OnInit {
  displayedColumns: string[] = ['name', 'inTime', 'outTime', 'date', 'action'];
  dataSource!: MatTableDataSource<any>
  longDate = "MMMM d, y"

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  emp: any;
  constructor(public dialog: MatDialog,private api: ApiService, private toast : NgToastService) { }

  ngOnInit(): void {

    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator

  }



postAtt(){
this.api.getAttendace().subscribe((result)=>{

  console.log(result);
  this.emp = result.data
  this.dataSource = new MatTableDataSource<any>(this.emp)


  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort
})
}

openDialog() {
  this.dialog.open(DialogAttendenceComponent, {
  width:'30%'
   }).afterClosed().subscribe(val=>{
     if(val === 'save'){
       this.postAtt();
     }
   })
}


editEmployee(row: any){
  this.dialog.open(AttendenceComponent,{
    width: '30%',
    data: row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.postAtt();
    }
  })
}


deleteAllAttendence(id: number){
  console.log(id);

  this.api.deleteAttendance(id)
  .subscribe({
    next:(res)=>{
      this.toast.success({detail:"Success Message", summary:res.message, duration:5000})
      this.postAtt();
    },
    error:(res)=>{
      this.toast.error({detail:"Error Message", summary:res.message, duration:5000})
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
