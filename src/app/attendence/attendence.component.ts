import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { DialogAttendenceComponent } from '../dialog-attendence/dialog-attendence.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent{
  form ! : FormGroup
  actionBtn : string = "save"
  constructor(private formBuilder: FormBuilder, private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AttendenceComponent>,
    private toast : NgToastService
    ) { }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      inTime : ['', Validators.required],
      outTime : ['', Validators.required],
        // joiningDate : ['', Validators.required],
        // contract : ['', Validators.required],
        // wfoWfh : ['', Validators.required],
        // assets : ['', Validators.required],
        // salary : ['', Validators.required],
        // documents : ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update"
      this.form.controls['name'].setValue(this.editData.name);
      this.form.controls['inTime'].setValue(this.editData.inTime);
      this.form.controls['outTime'].setValue(this.editData.outTime);
      // this.form.controls['joiningDate'].setValue(this.editData.joiningDate);
      // this.form.controls['contract'].setValue(this.editData.contract);
      // this.form.controls['wfoWfh'].setValue(this.editData.wfoWfh);
      // this.form.controls['assets'].setValue(this.editData.assets);
      // this.form.controls['salary'].setValue(this.editData.salary);
      // this.form.controls['documents'].setValue(this.editData.documents);
    }

  }

addEmployeeDetails(){
  if(!this.editData){
    if(this.form.valid){
      this.api.postAttendaceByDate(this.form.valid)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message", summary:res.message, duration:5000})
          this.form.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Enter While adding the employee", duration:5000})

        }
      })
    }
  }else{
    this.updateAttendace()
  }

}

updateAttendace(){
  this.api.putAttendace(this.form.value,this.editData._id)
  .subscribe({
    next:(res)=>{
      this.toast.success({detail:"Success Message", summary:"Attendace Data Updated Successfully", duration:5000})
      this.form.reset();
      this.dialogRef.close('Update')
    },
    error:()=>{
      this.toast.error({detail:"Error Message", summary:"Error while Updating the record!!", duration:5000})
    }
  })
}
}
