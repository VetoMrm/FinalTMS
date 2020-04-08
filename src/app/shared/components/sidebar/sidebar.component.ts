import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  designation;
  displayName;
  email;
  user:User
  userId;

  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit() {
    this.designation=localStorage.getItem('designation');
    this.displayName=localStorage.getItem('displayName');
    this.email=localStorage.getItem('email');
  }

  gotToDefault(){
  
    this.designation = localStorage.getItem("designation");
    this.userId = localStorage.getItem("userId");

    this.loginService.getHomeDetails(this.userId,this.designation)
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
}
