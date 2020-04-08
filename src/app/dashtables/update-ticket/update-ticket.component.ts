import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { TicketService } from 'src/app/ticket.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketEntity } from 'src/app/ticket';
import { TicketResolutionentity } from 'src/app/ticketResolution';
declare var $: any;


@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

designation;
formGroup;
getDescription;
getFile;
responseMsg;
localStorageUserId;
ticketId;
ticket:TicketEntity;
ticketResolution:TicketResolutionentity;
ticketStatus;
isResolution:boolean=false;
isResolutionFile:boolean=false;
resolutionFileDisplay:boolean=false;

  constructor(private loginService:LoginService,private ticketservice : TicketService,private fb : FormBuilder,
    private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {

    this.designation = localStorage.getItem("designation");
    this.localStorageUserId = localStorage.getItem("userId");

    
     this.ticketId = this.route.snapshot.params['id'];
   
     this.ticketservice.getTicketByTicketId(this.ticketId)
     .subscribe(response=>{
      this.ticket = new TicketEntity();
      this.ticketResolution = new TicketResolutionentity();
       this.ticket = response.object.ticketEntity;
       this.ticketResolution = response.object.ticketResolutionEntity;
       })
   
    }
    
    
    selectDescription(event:any){
      this.getDescription = event.target.value;
    }
    selectFile(event:any){
      //this.getFile = event.target.value;
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.getFile = file
      }
    }
  
    showAdminResolution(event:any){
    let status = event.target.value;
    let resolution = (<HTMLInputElement>document.getElementById("res")).value;
  		if(status == 'ReOpen'){
			if(resolution == '')
			{
				//$("#ticketAdmin").show();
				if(status == 'ReOpen')
				{
				this.isResolutionFile = true;
				 $("#issueDescription").prop("readonly", false);
				}else{
          this.isResolutionFile = false;
					$("#issueDescription").prop("readonly", true);
				}
			}
			if(status == 'ReOpen')
				{
          this.isResolutionFile = true;
				$("#issueDescription").prop("readonly", false);
				}
		}
		else{
			$("#issueDescription").prop("readonly", true);
			this.isResolutionFile = false;
		}
  }

  
  showTicketAdminResolution(event:any){
    let status = event.target.value;
    let resolution = (<HTMLInputElement>document.getElementById("res")).value;
		if(status == 'Fixed'){
			 if(resolution == '')
			{ 
				this.isResolution = true;
				if(status == 'Fixed')
				{
			   this.isResolutionFile = true;
				}else{
					this.isResolutionFile = false;
				}
			}
			if(status == 'Fixed')
				{
          this.isResolutionFile = true;
				}else{
					this.isResolutionFile = false;
				}
		}else{
			this.isResolution = false;
			this.isResolutionFile = false;
			
		}
  }
  resolutions;
  updateTicketToDBInResolution(){
    let resolution = (<HTMLInputElement>document.getElementById("res")).value;
    let ticketId = this.ticket.ticketId;
    let ticketStatus = (<HTMLInputElement>document.getElementById("ticketStatus")).value;
    let issueType = (<HTMLInputElement>document.getElementById("issueType")).value;
    let issueDescription = (<HTMLInputElement>document.getElementById("issueDescription")).value;
    this.getFile;
    //alert(ticketStatus)
    if((ticketStatus == 'Hold' || ticketStatus == 'Open' || ticketStatus == 'InProgress' || ticketStatus == 'Close') && (resolution == null || resolution=='')){
			this.updateTicketToDB();
    }else{
      if(resolution == null || resolution=='')
        {
        this.resolutions = (<HTMLInputElement>document.getElementById("resolutionss")).value;
        }else{
          this.resolutions = (<HTMLInputElement>document.getElementById("resolutions")).value;
        }
      //alert(this.resolutions)
      if(issueType == ''){
        alert("Please select Issue Type.."); return $("#issueType").focus();
      }
      
      if(issueDescription == "" || issueDescription == null){ alert("Please Enter Issue Description"); return $("#issueDescription").focus(); }
      
      if(ticketStatus == ''){
        alert("Please select Ticket Status.."); return $("#ticketStatus").focus();
      }
      
      if(this.resolutions == undefined ||this.resolutions == '' || this.resolutions == null){
        alert("Please Enter Resolutions.."); return $("#resolutionss").focus();
      }
      
      var formData = new FormData();
      formData.append("ticketStatus", ticketStatus);
      formData.append("issueType", issueType);
      formData.append("issueDescription", issueDescription);
      formData.append("resolutions", this.resolutions);
        if(this.getFile != '' || this.getFile == null) { 
          var file_data = this.getFile; 
      formData.append("file", file_data);
      this.ticketservice.updateTicketToDB(formData,this.ticket.ticketId,this.localStorageUserId)
      .subscribe(response=>{
        this.responseMsg = response.object.message;
      })
     }
    }
  }

  updateTicketToDB(){
    let ticketId = this.ticket.ticketId;
    let ticketStatus = (<HTMLInputElement>document.getElementById("ticketStatus")).value;
    let issueType = (<HTMLInputElement>document.getElementById("issueType")).value;
    let issueDescription = (<HTMLInputElement>document.getElementById("issueDescription")).value;
    if(issueType == ''){
			alert("Please select Issue Type.."); return $("#issueType").focus();
		}
		
		if(ticketStatus == ''){
			alert("Please select Ticket Status.."); return $("#ticketStatus").focus();
		}
		if(issueDescription == "" || issueDescription == null){ alert("Please Enter Issue Description"); return $("#issueDescription").focus(); }
		
		var formData = new FormData();
		formData.append("ticketStatus", ticketStatus);
		formData.append("issueType", issueType);
		formData.append("issueDescription", issueDescription);
	    if(this.getFile != '' || this.getFile == null) { 
        var file_data = this.getFile; 
    formData.append("file", file_data);
    this.ticketservice.updateTicketToDB(formData,this.ticket.ticketId,this.localStorageUserId)
      .subscribe(response=>{
        this.responseMsg = response.object.message;
      })
	 }
				
  }

  goBack(){
    let designation = localStorage.getItem("designation");
    let userId = localStorage.getItem("userId");

    this.loginService.getHomeDetails(userId,designation)
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
  getAttachedFile(){
    //let fileName = event.target.value;
   // this.ticket.ticketFileName
    alert(this.ticket.ticketFileName);
  }

}
