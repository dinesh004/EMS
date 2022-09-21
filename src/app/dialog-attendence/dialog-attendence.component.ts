import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-attendence',
  templateUrl: './dialog-attendence.component.html',
  styleUrls: ['./dialog-attendence.component.scss']
})
export class DialogAttendenceComponent implements OnInit {
  form ! : FormGroup
  actionBtn : string = "save"
  // displayedColumns: string[] = ['name', 'inTime', 'outTime'];
  // dataSource!: MatTableDataSource<any>;
  arr: any;

todayDate = new Date();


  constructor(private formBuilder: FormBuilder, private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogAttendenceComponent>,
    private toast : NgToastService
    ) { }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      date : ['', Validators.required],
      // name : ['', Validators.required],
      //   inTime : ['', Validators.required],
      //   outTime : ['', Validators.required],
        // contract : ['', Validators.required],
        // wfoWfh : ['', Validators.required],
        // assets : ['', Validators.required],
        // salary : ['', Validators.required],
        // documents : ['', Validators.required]


    })

    if(this.editData){
      this.actionBtn = "Update"
      this.form.controls['date'].setValue(this.editData.date);
      // this.form.controls['name'].setValue(this.editData.name);
      // this.form.controls['inTime'].setValue(this.editData.inTime);
      // this.form.controls['outTime'].setValue(this.editData.outTime);
      // this.form.controls['contract'].setValue(this.editData.contract);
      // this.form.controls['wfoWfh'].setValue(this.editData.wfoWfh);
      // this.form.controls['assets'].setValue(this.editData.assets);
      // this.form.controls['salary'].setValue(this.editData.salary);
      // this.form.controls['documents'].setValue(this.editData.documents);
    }

  }



addAttDetails(){
  if(!this.editData){
    if(this.form.valid){
      this.api.postAttendaceByDate(this.form.value)
      .subscribe({
        next:(res)=>{
          this.arr = res.data
          console.log(res.data);

          this.toast.success({detail:"Success Message", summary:"Employee Data Added Successfully", duration:5000})
          this.form.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Enter While adding the employee", duration:5000})

        }
      })
    }
  }else{
    this.updateAttendence()
  }

}

updateAttendence(){
  this.api.putAttendace(this.form.value,this.editData._id)
  .subscribe({
    next:(res)=>{
      this.toast.success({detail:"Success Message", summary:"Employee Data Updated Successfully", duration:5000})
      this.form.reset();
      this.dialogRef.close('Update')
      window.location.reload()
    },
    error:()=>{
      this.toast.error({detail:"Error Message", summary:"Error while Updating the record!!", duration:5000})
    }
  })
}


dateChanged(event: any){

  // moment(this.todayDate).format('YYYY-MM-DDThh:mm:ssZ')
  // console.log(this.todayDate);


  console.log(event.target.value);
}


}
