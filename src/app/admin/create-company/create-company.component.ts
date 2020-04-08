import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Company } from 'src/app/company';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  formGroup;
  msg;
  company:Company = new Company();
  submitted = false;
  checkCompanyName;
  checkCompanyNameMsg:boolean = false;
 


  constructor(private fb : FormBuilder,private loginService:LoginService,private router : Router) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      companyName:[null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/),Validators.minLength(5)]]
      })
  }
  get companyName(){
    return this.formGroup.get('companyName');
  }

  selectComapny(event:any){
  this.checkCompanyName= event.target.value; //event.target.options[event.target.options.selectedIndex].text;
  //alert(this.checkCompanyName)
  if(this.checkCompanyName != '')
  this.loginService.toCheckCompanyNameAlreadyExixtOrNot(this.checkCompanyName)
  .subscribe(response=>{
  if(response.success){
    $('#createCompany').prop('disabled', true);
    this.checkCompanyNameMsg = true;
  }else{
    this.checkCompanyNameMsg = false;
  }
   })
}

  createCompany(form:NgForm):any{
    this.company.companyName = form;
    this.loginService.toCheckCompanyNameAlreadyExixtOrNot( this.company.companyName)
    .subscribe(response=>{
      if(response.success){
        (<HTMLInputElement>document.getElementById("companyName")).value = '';
         this.checkCompanyNameMsg = true;
      }else{
        this.loginService.createCompany(this.company)
        .subscribe((response=>{
          if(response.success){
            this.submitted=true;
            (<HTMLInputElement>document.getElementById("companyName")).value = '';
            //this.router.navigate(['/default/modifyCompany']);
          }
        }))
      }
    })
  }
    

}
