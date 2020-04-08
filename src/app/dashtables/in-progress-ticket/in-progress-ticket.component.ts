import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/ticket.service';
import { LoginService } from 'src/app/login.service';

export interface TicketList {
  ticketId:number;
  companyTicketId:string;
  companyEntity:{
    companyName: string;
   }
  userEntity:{
    username: string;
   }
  createdDate:string
  issueCategory:string;
  issueSubCategory:string;
  assignedUser:{
    username: string;
   }
  priority: String;
  ticketStatus: string;
  ticketFileName:string;
  }



@Component({
  selector: 'app-in-progress-ticket',
  templateUrl: './in-progress-ticket.component.html',
  styleUrls: ['./in-progress-ticket.component.css']
})
export class InProgressTicketComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  designation;
  userId;

  constructor(private router:Router,private ticketService : TicketService,private loginService:LoginService) { }

  ngOnInit() {

    this.designation =  localStorage.getItem("designation");
    this.userId =  localStorage.getItem("userId");

    if(this.designation=='Admin'){
       this.getAdminInProgressTickets(this.userId);
    }
    if(this.designation=='User'){
        this.getUserInProgressTickets(this.userId);
    }
    if(this.designation=='Assigned_User'){
       this.getAssignedInProgressOpenTicket(this.userId);
    }

  }

  displayedColumns: string[] = ['ticketId', 'companyTicketId', 'companyEntity', 'userEntity','createdDate','issueCategory','issueSubCategory','assignedUser','priority','ticketStatus','ticketFileName','action'];
  dataSource :MatTableDataSource<TicketList>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAdminInProgressTickets(userId:number){
  this.ticketService.getAdminInProgressTickets(userId)
.subscribe(response=>{
  this.dataSource = new MatTableDataSource(response.object.ticketList);
  localStorage.setItem("adminOpenTicketCount",response.object.adminOpenTicketCount);
  localStorage.setItem("adminInProgressTicketCount",response.object.adminInProgressTicketCount);
  localStorage.setItem("adminFixedTicketCount",response.object.adminFixedTicketCount);
  localStorage.setItem("adminHoldTicketCount",response.object.adminHoldTicketCount);
  localStorage.setItem("adminClosedTicketList",response.object.adminClosedTicketList);
  localStorage.setItem("adminReOpenTicketCount",response.object.adminReOpenTicketCount);

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
})
}

  getUserInProgressTickets(userId:number){
    this.ticketService.getUserInProgressTickets(userId)
    .subscribe(response=>{
    this.dataSource = new MatTableDataSource(response.object.ticketList);
    localStorage.setItem("usersOpenTicketCount",response.object.usersOpenTicketCount);
      localStorage.setItem("usersInProgressTicketCount",response.object.usersInProgressTicketCount);
      localStorage.setItem("usersFixedTicketCount",response.object.usersFixedTicketCount);
      localStorage.setItem("usersClosedTicketList",response.object.usersClosedTicketList);
      localStorage.setItem("usersHoldTicketCount",response.object.usersHoldTicketCount);
      localStorage.setItem("usersReOpenTicketCount",response.object.usersReOpenTicketCount);


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  getAssignedInProgressOpenTicket(userId:number){
    this.ticketService.getAssignedUserInProgressTickets(userId)
    .subscribe(response=>{
    this.dataSource = new MatTableDataSource(response.object.ticketList);
    localStorage.setItem("assigneeOpenTicketCount",response.object.assigneeOpenTicketCount);
      localStorage.setItem("assigneeInProgressTicketCount",response.object.assigneeInProgressTicketCount);
      localStorage.setItem("assigneeHoldTicketCount",response.object.assigneeHoldTicketCount);
      localStorage.setItem("assigneeClosedTicketList",response.object.assigneeClosedTicketList);
      localStorage.setItem("assigneeFixedTicketList",response.object.assigneeFixedTicketList);
      localStorage.setItem("assigneeReOpenTicketList",response.object.assigneeReOpenTicketList);


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });

  }

  deleteTicket(element){
    let id = element.ticketId
    if(confirm("Do you Realy Want to delete this Ticket?"))
    this.ticketService.deleteTicket(id)
    .subscribe(response=>{
      if(response.success){
        if(this.designation=='Assigned_User'){
          this.getAssignedInProgressOpenTicket(this.userId);
       }}
    })
  }
  

  editOpenTicket(element){
    let id = element.ticketId
    this.router.navigate(['/default/updateTicket',id]);
  }

  navigateDash(){
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

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

}
