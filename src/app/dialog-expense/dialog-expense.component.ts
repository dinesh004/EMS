import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog-expense',
  templateUrl: './dialog-expense.component.html',
  styleUrls: ['./dialog-expense.component.scss']
})
export class DialogExpenseComponent implements OnInit {
  form ! : FormGroup
  actionBtn : string = "save"
  constructor(private formBuilder: FormBuilder, private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogExpenseComponent>,
    private toast : NgToastService

    ) { }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      category : ['', Validators.required],
      amount : ['', Validators.required],
      date : ['', Validators.required],
      remark : ['', Validators.required],
        // contract : ['', Validators.required],
        // wfowfh : ['', Validators.required],
        // assets : ['', Validators.required],
        // salary : ['', Validators.required],
        // documents : ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update"
      this.form.controls['category'].setValue(this.editData.category);
      this.form.controls['amount'].setValue(this.editData.amount);
      this.form.controls['date'].setValue(this.editData.date);
      this.form.controls['remark'].setValue(this.editData.remark);
      // this.form.controls['contract'].setValue(this.editData.contract);
      // this.form.controls['wfowfh'].setValue(this.editData.wfowfh);
      // this.form.controls['assets'].setValue(this.editData.assets);
      // this.form.controls['salary'].setValue(this.editData.salary);
      // this.form.controls['documents'].setValue(this.editData.documents);
    }

  }

addExpenseDetails(){
  if(!this.editData){
    if(this.form.valid){
      this.api.postExpense(this.form.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message", summary:"Expenses Added Successfully", duration:5000})
          this.form.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Enter While Adding The Expense", duration:5000})
        }
      })
    }
  }else{
    this.updateExpense()
  }

}

updateExpense(){
  this.api.putExpense(this.form.value, this.editData._id)
  .subscribe({
    next:(res)=>{
      this.toast.success({detail:"Success Message", summary:"Expenses Updated Successfully", duration:5000})
      this.form.reset();
      this.dialogRef.close('Update')
      window.location.reload()
    },
    error:()=>{
      this.toast.error({detail:"Error Message", summary:"Error while Updating the record!", duration:5000})
    }
  })
}
}
