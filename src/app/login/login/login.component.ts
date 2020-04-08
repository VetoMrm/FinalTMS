import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { User } from 'src/app/user';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user:User = new User();
    invalidCredential:boolean = false;
    formGroup;
    formGroup1;
    forgotPasswordResponse;
    loading:boolean;

  constructor(private router :Router,private loginservice:LoginService,private fb : FormBuilder) { }

  ngOnInit() {
     this.formGroup = this.fb.group({
    myUserName:[null, [Validators.required]],
    myPassword:[null,[Validators.required]]
    });

    this.formGroup1 = this.fb.group({
      emailId:['',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]]
    })
  }

  get emailId(){
    return this.formGroup1.get('emailId');
  }

  // valid(userName:string,password:string):any{
  //   if((userName=='SuperAdmin' || userName =='TicketAdmin' || userName=='VetologicAdmin' || userName=='VetologicUser') && password=='12345678'){
  //     localStorage.setItem("userName",userName);
  //     return this.router.navigate(['/default']);
  //  }else{
  //   this.invalid=true;
  //     return false;
  //   }
  //   }


  validate():any{
      console.log("this is login component");
      this.loading = true;
   this.loginservice.checkUserCredentials(this.user)
   .subscribe((response)=>{
    this.loading = false;
    if(response.success){
      this.invalidCredential=true;
      (<HTMLInputElement>document.getElementById("username")).value = '';
      (<HTMLInputElement>document.getElementById("password")).value = '';
      return false;
    }else{
      localStorage.setItem("userId",response.object.userId);
      localStorage.setItem("userName",response.object.userName);
      localStorage.setItem("designation",response.object.designation);
      localStorage.setItem("displayName",response.object.displayName);
      localStorage.setItem("email",response.object.email);
      localStorage.setItem("registrationDate",response.object.registrationDate);


      localStorage.setItem("adminOpenTicketCount",response.object.adminOpenTicketCount);
      localStorage.setItem("adminInProgressTicketCount",response.object.adminInProgressTicketCount);
      localStorage.setItem("adminFixedTicketCount",response.object.adminFixedTicketCount);
      localStorage.setItem("adminHoldTicketCount",response.object.adminHoldTicketCount);
      localStorage.setItem("adminClosedTicketList",response.object.adminClosedTicketList);
      localStorage.setItem("adminReOpenTicketCount",response.object.adminReOpenTicketCount);


      localStorage.setItem("usersOpenTicketCount",response.object.usersOpenTicketCount);
      localStorage.setItem("usersInProgressTicketCount",response.object.usersInProgressTicketCount);
      localStorage.setItem("usersFixedTicketCount",response.object.usersFixedTicketCount);
      localStorage.setItem("usersClosedTicketList",response.object.usersClosedTicketList);
      localStorage.setItem("usersHoldTicketCount",response.object.usersHoldTicketCount);
      localStorage.setItem("usersReOpenTicketCount",response.object.usersReOpenTicketCount);


      localStorage.setItem("assigneeOpenTicketCount",response.object.assigneeOpenTicketCount);
      localStorage.setItem("assigneeInProgressTicketCount",response.object.assigneeInProgressTicketCount);
      localStorage.setItem("assigneeHoldTicketCount",response.object.assigneeHoldTicketCount);
      localStorage.setItem("assigneeClosedTicketList",response.object.assigneeClosedTicketList);
      localStorage.setItem("assigneeFixedTicketList",response.object.assigneeFixedTicketList);
      localStorage.setItem("assigneeReOpenTicketList",response.object.assigneeReOpenTicketList);
      
      
      return this.goDefault();
    }
   });
    }
    
    goDefault(){
    let designation = localStorage.getItem("designation");
    let userId = localStorage.getItem("userId");

    this.loginservice.getHomeDetails(userId,designation)
    .subscribe(response=>{
      this.router.navigate(['/default/dashboard'],{
        queryParams:{
          adminOpenTicket : response.object.adminOpenTicketCount,
          adminInprogressTicket : response.object.adminInProgressTicketCount,
          adminFixedTicket : response.object.adminFixedTicketCount,
          adminHoldTicket :response.object.adminHoldTicketCount,
          adminClosedTicket :response.object.adminClosedTicketList,
          adminReOpenTicket :response.object.adminReOpenTicketCount,

          userOpenTicket:response.object.usersOpenTicketCount,
          userInprogressTicket:response.object.usersInProgressTicketCount,
          userFixedTicket:response.object.usersFixedTicketCount,
          userClosedTicket:response.object.usersClosedTicketList,
          userHoldTicket:response.object.usersHoldTicketCount,
          userReOpenTicket:response.object.usersReOpenTicketCount,

          assigneOpenTicket:response.object.assigneeOpenTicketCount,
          assigneInprogressTicket:response.object.assigneeInProgressTicketCount,
          assigneHoldTicket:response.object.assigneeHoldTicketCount,
          assigneClosedTicket:response.object.assigneeClosedTicketList,
          assigneFixedTicket:response.object.assigneeFixedTicketList,
          assigneReOpenTicket:response.object.assigneeReOpenTicketList
        }
      });
    })
  }


    forgotPassword(){
      let emailId = (<HTMLInputElement>document.getElementById("forgotPasswordEmail")).value;
      alert(emailId);
      this.loginservice.forgotPassword(emailId)
      .subscribe(response=>{
        (<HTMLInputElement>document.getElementById("forgotPasswordEmail")).value=''
        if(response.success){
          this.forgotPasswordResponse = response.message;
        }else{
          this.forgotPasswordResponse = response.message;
        }
      })

    }
  // valid(name:string,password:string):any{
  //   if(name=='faiz'&& password=='faiz'){
  //     alert("login success");
  //     return this.router.navigate(['/default']);
  //   }
  //   else{
  //     return false;
  //   }
  // }
}
