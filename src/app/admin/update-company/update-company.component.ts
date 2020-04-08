import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  company:Company;
  companyId;
  formGroup;
  responseMsg;
  checkCompanyNameMsg:boolean = false;

  constructor(private route: ActivatedRoute,private loginService:LoginService,private fb : FormBuilder) { }

  ngOnInit() {
    this.company= new Company();

    this.companyId = this.route.snapshot.params['id'];
    
    this.loginService.getCompanyDetailById(this.companyId)
      .subscribe(data => {
        this.company = data;
      });

      this.formGroup = this.fb.group({
        companyName:[null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/),Validators.minLength(5)]]
      })
  }

  get companyName(){
    return this.formGroup.get('companyName');
  }
  updateCompany(cName){
    this.company.companyName = cName;
    this.loginService.updateCompanyToDbById(this.company,this.companyId)
    .subscribe(response=>{
      if(response.success){
        this.responseMsg = "Company Data Updated Succesfully";
      }else{
        this.responseMsg = "Company Data Updated Succesfully";
      }
    })
  }

  selectComapny(event:any){
    let pattren = /^[a-zA-Z\s]+$/;
    let checkCompanyName= event.target.value; //event.target.options[event.target.options.selectedIndex].text;
    //alert(this.checkCompanyName)
    if(checkCompanyName !== '')
    this.loginService.toCheckCompanyNameAlreadyExistOrNotForUpdate(checkCompanyName,this.companyId)
    .subscribe(response=>{
    if(response.success){
      this.checkCompanyNameMsg = true;
      if((checkCompanyName === "" && !checkCompanyName.match(pattren) && checkCompanyName.length<5) || this.checkCompanyNameMsg){
        $('#updateCompany').prop('disabled', true);
        }
    }else{
      this.checkCompanyNameMsg = false;
      if((checkCompanyName !== "" && checkCompanyName.match(pattren) && checkCompanyName.length>5) && !this.checkCompanyNameMsg){
        //alert("ella")
      $('#updateCompany').prop('disabled', false);
      }
      if(checkCompanyName === "" && !checkCompanyName.match(pattren) && checkCompanyName.length<5){
        $('#updateCompany').prop('disabled', true);
      }
    }
     })
  }

}
