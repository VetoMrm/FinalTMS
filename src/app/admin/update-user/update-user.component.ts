import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/company';
import { User } from 'src/app/user';
declare var $: any;

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  localStorageUserId; 
  designation;
  formGroup;
  userDetail;
  company:Company[];
  user:User;
  userId;
  msg;
  userNameAlreadyExist:boolean=false;
  emailIdAlreadyExist:boolean=false;
  constructor(private route: ActivatedRoute,private loginService:LoginService,private fb : FormBuilder) { }

  ngOnInit() {
        
    this.designation = localStorage.getItem("designation");

    this.user = new User();
    this.userId = this.route.snapshot.params['id'];
    
    this.getCompanyNames();

    this.getUserDetails(this.userId );

    this.loginService.getUserDetailById(this.userId)
    .subscribe(response=>{
      this.user = response;
    })

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
    this.loginService.getUserDetails(localId)
    .subscribe(response=>{
      this.userDetail = response.object.user.companyEntity.companyId;
      })
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
  this.loginService.toCheckEmailIdAlreadyExistOrNotForUpdate(email,this.userId)
  .subscribe(response=>{
  if(response.success){
    this.emailIdAlreadyExist = true;
    if((email === "" && !email.match(pattren)) || this.emailIdAlreadyExist){
         $('#updateUser').prop('disabled', true);
      }
  }else{
    this.emailIdAlreadyExist = false;
    if((email !== "" && email.match(pattren)) && !this.emailIdAlreadyExist){
         $('#updateUser').prop('disabled', false);
    }
    if(email === "" && !email.match(pattren)){
      $('#updateUser').prop('disabled', true);
    }
  }
   })
  }

  checkUserName(event:any){
    let pattren = /^[a-zA-Z\s]+$/;
    let userName = event.target.value;
    if(userName !== ''){
    this.loginService.toCheckUserNameAlreadyExistOrNotForUpdate(userName,this.userId)
    .subscribe(response=>{
    if(response.success){
      this.userNameAlreadyExist = true;
     if((userName === "" && !userName.match(pattren) && userName.length<5) || this.userNameAlreadyExist){
     // alert("edhe")
      $('#updateUser').prop('disabled', true);
     }
    }else{
      this.userNameAlreadyExist = false;
      if((userName !== "" && userName.match(pattren) && userName.length>5) && !this.userNameAlreadyExist){
        //alert("ella")
      $('#updateUser').prop('disabled', false);
      }
      if(userName === "" && !userName.match(pattren) && userName.length<5){
        $('#updateUser').prop('disabled', true);
      }
    }
     })
    }
  }




  updateeUser(uName:string,dName:string,email:string)
{
  this.user.username=uName;
    this.user.displayName=dName;
    this.user.email=email;
    let companyId = (<HTMLInputElement>document.getElementById("companyId")).value;
      let userTypeId = (<HTMLInputElement>document.getElementById("userType")).value;
      this.user.companyId = Number(companyId);
      this.user.designationId=Number(userTypeId);
      this.user.userId = this.userId;
      this.loginService.updateUserToDb(this.user)
      .subscribe(reponse=>{
        if(reponse.success){
          this.msg = "User Updated Successfully";
        }else{
          this.msg = "User Updated UnSuccessfully";
        }
      })


}
}
