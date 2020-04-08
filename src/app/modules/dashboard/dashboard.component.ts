import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  designation;
  userId;

  // adminOpenTicket;
  // adminInprogressTicket;
  // adminFixedTicket;
  // adminHoldTicket;
  // adminReOpenTicket;
  // adminClosedTicket;

  // userOpenTicket;
  // userInprogressTicket;
  // userFixedTicket;
  // userHoldTicket;
  // userReOpenTicket;
  // userClosedTicket;

  // assigneOpenTicket;
  // assigneInprogressTicket;
  // assigneFixedTicket;
  // assigneHoldTicket;
  // assigneReOpenTicket;
  // assigneClosedTicket;

  ticket;

  constructor(private router : Router,private loginService:LoginService,private activate : ActivatedRoute) { }

  ngOnInit() {
    this.designation = localStorage.getItem("designation");
   
    this.activate.queryParams.subscribe(response=>{
            this.ticket = response;
           });
    }

  getAdminOpenTickets(){
   this.router.navigate(['/default/openTicket']);
  }

  getAdminInProgressTickets(){
    this.router.navigate(['/default/inProgressTicket']);
  }

  getAdminFixedTickets(){
    this.router.navigate(['/default/fixedTicket']);
  }

  getAdminHoldTickets(){
    this.router.navigate(['/default/holdTicket']);
  }

  getAdminClosedTickets(){
    this.router.navigate(['/default/closedTicket']);
  }
  getAdminReOpenTickets(){
    this.router.navigate(['/default/reOpenTicket']);
  }

  getUserOpenTickets(){
    this.router.navigate(['/default/openTicket']);
   }
 
   getUserInProgressTickets(){
     this.router.navigate(['/default/inProgressTicket']);
   }
 
   getUserFixedTickets(){
     this.router.navigate(['/default/fixedTicket']);
   }
 
   getUserHoldTickets(){
     this.router.navigate(['/default/holdTicket']);
   }
 
   getUserClosedTickets(){
     this.router.navigate(['/default/closedTicket']);
   }
   getUserReOpenTickets(){
     this.router.navigate(['/default/reOpenTicket']);
   }
 
   getAssigneeOpenTickets(){
    this.router.navigate(['/default/openTicket']);
   }
 
   getAssigneeInProgressTickets(){
     this.router.navigate(['/default/inProgressTicket']);
   }
 
   getAssigneeFixedTickets(){
     this.router.navigate(['/default/fixedTicket']);
   }
 
   getAssigneeHoldTickets(){
     this.router.navigate(['/default/holdTicket']);
   }
 
   getAssigneeClosedTickets(){
     this.router.navigate(['/default/closedTicket']);
   }
   
   getAssigneeReOpenTickets(){
     this.router.navigate(['/default/reOpenTicket']);
   }
 

}
