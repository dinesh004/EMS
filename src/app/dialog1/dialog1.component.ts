import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.scss']
})
export class Dialog1Component implements OnInit {
  form ! : FormGroup
  actionBtn : string = "save"
  constructor(private formBuilder: FormBuilder, private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<Dialog1Component>,
    private toast : NgToastService

    ) { }

    public empArray: any=[]
  ngOnInit(): void {


    this.form = this.formBuilder.group({
      name : ['', Validators.required],
        fromDate : ['', Validators.required],
        toDate : ['', Validators.required],
        remark : ['', Validators.required],
        // contract : ['', Validators.required],
        // wfowfh : ['', Validators.required],
        // assets : ['', Validators.required],
        // salary : ['', Validators.required],
        // documents : ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update"
      this.form.controls['name'].setValue(this.editData.name);
      this.form.controls['fromDate'].setValue(this.editData.fromDate);
      this.form.controls['toDate'].setValue(this.editData.toDate);
      this.form.controls['remark'].setValue(this.editData.remark);
      // this.form.controls['contract'].setValue(this.editData.contract);
      // this.form.controls['wfowfh'].setValue(this.editData.wfowfh);
      // this.form.controls['assets'].setValue(this.editData.assets);
      // this.form.controls['salary'].setValue(this.editData.salary);
      // this.form.controls['documents'].setValue(this.editData.documents);
    }


    this.api.getEmployee().subscribe((data: any)=>{
      // console.log(data);
      this.empArray=data.data

    })

  }

  addLeaveDetails(){
  if(!this.editData){
    if(this.form.valid){
      this.api.postLeave(this.form.value,this.editData._id)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message", summary:"Leave Added Successfully", duration:5000})
          this.form.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Enter While Adding The Leave", duration:5000})

        }
      })
    }
  }else{
    this.updateLeave()
  }

}

updateLeave(){
  this.api.putLeave(this.form.value,this.editData._id)
  .subscribe({
    next:(res)=>{
      this.toast.success({detail:"Success Message", summary:"Leave Updated Successfully", duration:5000})
      this.form.reset();
      this.dialogRef.close('Update')
      window.location.reload()
    },
    error:()=>{
      this.toast.error({detail:"Error Message", summary:"Error while Updating the record!!", duration:5000})
    }
  })
}
}
