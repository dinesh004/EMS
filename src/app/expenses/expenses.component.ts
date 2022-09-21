import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { DialogExpenseComponent } from '../dialog-expense/dialog-expense.component';
import { Dialog1Component } from '../dialog1/dialog1.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  displayedColumns: string[] = ['category', 'amount', 'date', 'remark', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService,
    private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllExpense();
  }

  openDialog() {
    this.dialog.open(DialogExpenseComponent, {
    width:'30%'
     }).afterClosed().subscribe(val=>{
       if(val === 'save'){
         this.getAllExpense();
       }
     })
  }


    getAllExpense(){
      this.api.getExpense()
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


    editExpense(row: any){
      this.dialog.open(DialogExpenseComponent,{
        width: '30%',
        data: row
      }).afterClosed().subscribe(val=>{
        if(val==='update'){
          this.getAllExpense();
        }
      })
    }


    deleteAllExpense(id: number){
      this.api.deleteExpense(id)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message", summary:"Expenses Data Delete Successfully", duration:5000})
          this.getAllExpense();
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
