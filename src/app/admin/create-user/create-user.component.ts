import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Company } from 'src/app/company';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/user';
declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
 
  company:Company[];
  designation;
  formGroup;
  user:User = new User();
  userTypeId: number;
  companyId:number;
  msg;
  localStorageUserId;
  userDetail;
  loading:boolean;
  userNameAlreadyExist:boolean=false;
  emailIdAlreadyExist:boolean=false;

  constructor(private loginService : LoginService,private fb : FormBuilder) { }

  ngOnInit() {

    this.designation = localStorage.getItem("designation");
    this.localStorageUserId = localStorage.getItem("userId");
    this.getCompanyNames();
    this.getUserDetails(this.localStorageUserId);
    
    

    this.formGroup = this.fb.group({
      companyName:['',[Validators.required]],
      userName:[null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/),Validators.minLength(5)]],
      displayName:[null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/),Validators.minLength(5)]],
      userType:['',[Validators.required]],
      emailId:['',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      }); 

    }
   
  get companyName(){
    return this.formGroup.get('companyName');
  }

  get userName(){
    return this.formGroup.get('userName');
  }
  
  get displayName(){
    return this.formGroup.get('displayName');
  }

  get userType(){
        return this.formGroup.get('userType');
  }

  get emailId(){
    return this.formGroup.get('emailId');
}

  getUserDetails(localId:number){
   if(this.designation=='Admin'){
    this.loginService.getUserDetails(localId)
    .subscribe(response=>{
      this.userDetail = response.object.user.companyEntity.companyId;
      })
   }
  }

  getCompanyNames(){
    this.loginService.getAllCompanyList()
    .subscribe(data=>{
      this.company=data;
    })
  }


  checkEmailId(event:any){
    let pattren = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let email = event.target.value;
    if(email !== '')
  this.loginService.toCheckEmailIdAlreadyExistOrNot(email)
  .subscribe(response=>{
  if(response.success){
    this.emailIdAlreadyExist = true;
    if((email === "" && !email.match(pattren)) || this.emailIdAlreadyExist){
         $('#creteUser').prop('disabled', true);
      }
  }else{
    this.emailIdAlreadyExist = false;
    if((email !== "" && email.match(pattren)) && !this.emailIdAlreadyExist){
         $('#creteUser').prop('disabled', false);
    }
    if(email === "" && !email.match(pattren)){
      $('#creteUser').prop('disabled', true);
    }
  }
   })
  }

  checkUserName(event:any){
    let userName = event.target.value;
    if(userName != '')
    this.loginService.toCheckUserNameAlreadyExistOrNot(userName)
    .subscribe(response=>{
    if(response.success){
      //(<HTMLInputElement>document.getElementById("userName")).value = '';
      $('#creteUser').prop('disabled', true);
      this.userNameAlreadyExist= true;
    }else{
      this.userNameAlreadyExist = false;
    }
     })

  }


  selectUserType(event:any){
    this.userTypeId = event.target.value;
  }

  selectComapny(event:any){
    this.companyId = event.target.value;
  }

  createUser(uName:string,dName:string,email:string){
    this.loading = true;
    this.user.username=uName;
    this.user.displayName=dName;
    this.user.email=email;
    if(this.designation=='Admin'){
      let companyId = (<HTMLInputElement>document.getElementById("companyId")).value;
      let userTypeId = (<HTMLInputElement>document.getElementById("userType")).value;
      this.user.companyId = Number(companyId);
      this.user.designationId=Number(userTypeId);
      // alert(this.user.companyId)
      // alert(this.user.username)
      // alert(this.user.designationId)
      // alert(this.user.displayName)
      // alert(this.user.email)
      this.loginService.createUser(this.user)
      .subscribe(response=>{
        this.loading = false;
        if(response.success){
          this.msg = response.message;
          (<HTMLInputElement>document.getElementById("userName")).value = '';
          (<HTMLInputElement>document.getElementById("displayName")).value = '';
          (<HTMLInputElement>document.getElementById("email")).value = '';
              }else{
            this.msg = response.message;
          (<HTMLInputElement>document.getElementById("userName")).value = '';
          (<HTMLInputElement>document.getElementById("displayName")).value = '';
          (<HTMLInputElement>document.getElementById("email")).value = '';
        }
      })
      }else{
      this.user.companyId = this.companyId;
    //this.user.designationId=this.userTypeId;
    let userTypeId = (<HTMLInputElement>document.getElementById("userType")).value;
    this.user.designationId = Number(userTypeId);
    // alert(this.user.companyId)
    // alert(this.user.username)
    // alert(this.user.designationId)
    // alert(this.user.displayName)
    // alert(this.user.email)
    this.loginService.createUser(this.user)
    .subscribe(response=>{
      this.loading = false;
      if(response.success){
        this.msg = response.message;
        (<HTMLInputElement>document.getElementById("companyId")).value = '';
        (<HTMLInputElement>document.getElementById("userName")).value = '';
        (<HTMLInputElement>document.getElementById("displayName")).value = '';
        // (<HTMLInputElement>document.getElementById("userType")).value = '';
        (<HTMLInputElement>document.getElementById("email")).value = '';
            }else{
          this.msg = response.message;
        (<HTMLInputElement>document.getElementById("companyId")).value = '';
        (<HTMLInputElement>document.getElementById("userName")).value = '';
        (<HTMLInputElement>document.getElementById("displayName")).value = '';
        //(<HTMLInputElement>document.getElementById("userType")).value = '';
        (<HTMLInputElement>document.getElementById("email")).value = '';
        
      }
    })
    }
    
  }

}
