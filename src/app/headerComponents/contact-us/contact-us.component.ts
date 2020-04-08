import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomServiceService } from 'src/app/custom-service.service';
declare var $: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formGroup;
  responseMsg;

  constructor(private router:Router,private fb :FormBuilder,private customService : CustomServiceService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstName:['',[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/),Validators.minLength(5)]],
      lastName:[null, [Validators.required]],
      emailValidation:['',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      subjectValidation:[null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
      messageValidation:['',[Validators.required,Validators.minLength(20)]]
      }); 
  }

  get firstName(){
    return this.formGroup.get('firstName');
  }
  get lastName(){
    return this.formGroup.get('lastName');
  }
  get emailValidation(){
    return this.formGroup.get('emailValidation');
  }
  get subjectValidation(){
    return this.formGroup.get('subjectValidation');
  }
  get messageValidation(){
    return this.formGroup.get('messageValidation');
  }

  hideThis(){
      (<HTMLInputElement>document.getElementById("firstName")).value = '';
      (<HTMLInputElement>document.getElementById("lastName")).value = '';
      (<HTMLInputElement>document.getElementById("emailId")).value = '';
      (<HTMLInputElement>document.getElementById("subject")).value = '';
      (<HTMLInputElement>document.getElementById("message")).value = '';

    $("#contactUs").hide();
    this.router.navigate(['/default']);
        }

  send(fName:string,lName:string,emailId:string,subject:string,message:string){
    const formData = new FormData();
    formData.append('firstName', fName);
    formData.append('lastName', lName);
    formData.append('email', emailId);
    formData.append('subject', subject);
    formData.append('message', message);
    this.customService.saveContactUs(formData)
    .subscribe(response=>{
      this.responseMsg = response.message;
      (<HTMLInputElement>document.getElementById("firstName")).value = '';
      (<HTMLInputElement>document.getElementById("lastName")).value = '';
      (<HTMLInputElement>document.getElementById("emailId")).value = '';
      (<HTMLInputElement>document.getElementById("subject")).value = '';
      (<HTMLInputElement>document.getElementById("message")).value = '';
    })
  }

}
