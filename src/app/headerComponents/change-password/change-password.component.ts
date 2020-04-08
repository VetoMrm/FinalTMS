import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomServiceService } from 'src/app/custom-service.service';
import { User } from 'src/app/user';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userId;
  user:User = new User();
  formGroup;
  invalidMsg;
  responseMsg;

  constructor(private router:Router,private customService : CustomServiceService,private fb :FormBuilder) { }

  ngOnInit() {

  this.userId = localStorage.getItem('userId');
  this.customService.getUserDetailById(this.userId)
  .subscribe(response=>{
     this.user = response;
  })

  this.formGroup = this.fb.group({
      currentPassword:['',[Validators.required]],
      newPassword:['', [Validators.required,Validators.minLength(5)]],
      confirmPassword:['',[Validators.required,,Validators.minLength(5)]],
    },{validator: this.MatchPassword});
  }

  MatchPassword(control: AbstractControl) {
    let password = control.get('newPassword').value;
    let confirmPassword = control.get('confirmPassword').value;
    if (password != confirmPassword) {
      control.get('confirmPassword').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
}

  get currentPassword(){
    return this.formGroup.get('currentPassword');
  }

  get newPassword(){
    return this.formGroup.get('newPassword');
  }

  get confirmPassword(){
    return this.formGroup.get('confirmPassword');
  }

  updateNewPassword(){
    let currentPassword = (<HTMLInputElement>document.getElementById("currentPassword")).value;
    let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    if(this.user.password != currentPassword){
          this.invalidMsg = "The Current Password which you have entered is invalid..Please check and re-enter";
    }else{
      this.user.password = confirmPassword;
        this.customService.changePassword(this.user)
        .subscribe(response=>{
          (<HTMLInputElement>document.getElementById("currentPassword")).value='';
          (<HTMLInputElement>document.getElementById("newPassword")).value='';
          (<HTMLInputElement>document.getElementById("confirmPassword")).value='';
          if(response.success){
            this.responseMsg = "Password changed successfully";
          }else{
            this.responseMsg = "Password changed Unsuccessfully"
          }
         
        })
    }
    }
 
  
  hideThis(){
    $("#changePassword").hide();
    this.router.navigate(['/default']);
  }

}
