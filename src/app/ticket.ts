export class TicketEntity{
 ticketId:number;
 userEntity:{
     userId:number;
     username:string;
 }
 assignedUser:{
     userId:number;
     username:string;
 }
 companyEntity:{
     companyId:number;
     companyName:string;
 }
 companyTicketId:string;
 issueCategory:string;
 issueSubCategory:string;
 issueType:string;
 issueDescription:string;
 priority:string;
 ticketFileName:string
 resolutionFileName:string;
 createdDate:string;
 ticketStatus:string

}