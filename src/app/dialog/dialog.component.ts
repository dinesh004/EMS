import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { UploadService } from '../services/upload.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form ! : FormGroup
  actionBtn : string = "save"
  file:  any;

  constructor(private formBuilder: FormBuilder, private fileUploadService: UploadService,  private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private toast : NgToastService
    ) { }


    shortLink: string = "";
    loading: boolean = false; // Flag variable
    files:  any = null// Variable to store file

  ngOnInit(): void {


    this.form = this.formBuilder.group({

      name : ['', Validators.required],
        address : ['', Validators.required],
        phone : ['', Validators.required],
        joiningDate : ['', Validators.required],
        contract : ['', Validators.required],
        wfoWfh : ['', Validators.required],
        assets : ['', Validators.required],
        salary : ['', Validators.required],
        // documents : ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update"
      this.form.controls['name'].setValue(this.editData.name);
      this.form.controls['address'].setValue(this.editData.address);
      this.form.controls['phone'].setValue(this.editData.phone);
      this.form.controls['joiningDate'].setValue(this.editData.joiningDate);
      this.form.controls['contract'].setValue(this.editData.contract);
      this.form.controls['wfoWfh'].setValue(this.editData.wfoWfh);
      this.form.controls['assets'].setValue(this.editData.assets);
      this.form.controls['salary'].setValue(this.editData.salary);
      // this.form.controls['documents'].setValue(this.editData.documents);
    }

  }
// On file Select
// onChange(event: any) {
//   this.file = event.target.files[0];
// }

// OnClick of button Upload
// onUpload() {
//   this.loading = !this.loading;
//   console.log(this.file);
//   this.fileUploadService.upload(this.file).subscribe(
//       (event: any) => {
//           if (typeof (event) === 'object') {

//               // Short link via api response
//               this.shortLink = event.link;

//               this.loading = false; // Flag variable
//           }
//       }
//   );
// }


addEmployeeDetails(){
  if(!this.editData){
    if(this.form.valid){
      this.api.postEmployee(this.form.value)
      .subscribe({
        next:(res)=>{
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
    this.updateEmploye()
  }

}

updateEmploye(){
  this.api.putEmployee(this.form.value,this.editData._id)
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



}
