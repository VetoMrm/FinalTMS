import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Company } from 'src/app/company';
import { TicketService } from 'src/app/ticket.service';
import { User } from 'src/app/user';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

designation;
company:Company[];
userList:User[];
formGroup;
getcompanyId;
getRequesterId;
getIssueCategory;
getIssueSubCategory;
getissueType;
getSeverity;
getDescription;
getFile;
responseMsg;
responseTicketId;
localStorageUserId;

  constructor(private loginService:LoginService,private ticketservice : TicketService,private fb : FormBuilder) { }

  ngOnInit() {
    this.getCompanyNames();
    this.designation = localStorage.getItem("designation");
    this.localStorageUserId = localStorage.getItem("userId");
  
    if(this.designation == 'Assigned_User'){
      this.formGroup = this.fb.group({
        companyId:['',[Validators.required]],
        userId:['', [Validators.required]],
        issueCategory:['', [Validators.required]],
        issueSubCategory:['', [Validators.required]],
        issueType:['', [Validators.required]],
        severity:['',[Validators.required]],
        issueDescription:['',[Validators.required,Validators.minLength(20)]]
        // uploadFile:['',[Validators.required]]
        }); 
      }
      if(this.designation == 'Admin' || this.designation == 'User'){
        this.formGroup = this.fb.group({
          issueCategory:['', [Validators.required]],
          issueSubCategory:['', [Validators.required]],
          issueType:['', [Validators.required]],
          severity:['',[Validators.required]],
          issueDescription:['',[Validators.required,Validators.minLength(20)]]
          // uploadFile:['',[Validators.required]]
          }); 
      }
    
  }

  get companyId(){
    return this.formGroup.get('companyId');
  }
  get userId(){
    return this.formGroup.get('userId');
  }
  get issueCategory(){
    return this.formGroup.get('issueCategory');
  }
  get issueSubCategory(){
    return this.formGroup.get('issueSubCategory');
  }
  get issueType(){
    return this.formGroup.get('issueType');
  }
  get severity(){
    return this.formGroup.get('severity');
  }
  get issueDescription(){
    return this.formGroup.get('issueDescription');
  }
  // get uploadFile(){
  //   return this.formGroup.get('uploadFile');
  // }

  getCompanyNames(){
    this.loginService.getAllCompanyList()
    .subscribe(data=>{
      this.company=data;
      // console.log(this.company);
    })
  }

  selectRequester(event:any){
   this.getcompanyId = event.target.value;
   this.ticketservice.getAllUsersListByCompanyId(this.getcompanyId)
   .subscribe(response=>{
     this.userList = response;
   })
  }
  selectUser(event:any){
    this.getRequesterId = event.target.value;
  }
  
  getSubCategory(event:any){
    this.getIssueSubCategory = event.target.value;
  }

  selectIssueType(event:any){
    this.getissueType = event.target.value;
  }
  
  selectSeverity(event:any){
    this.getSeverity = event.target.value;
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
  

  selectIssueSubCategory(event:any){
    this.getIssueCategory= event.target.value;

    let direct = "<option value=''>--Select Issue Sub-Category--</option>";
    let inDirect = "<option value=''>--Select Issue Sub-Category--</option>";
    let audit = "<option value=''>--Select Issue Sub-Category--</option>";
    let others = "<option value=''>--Select Issue Sub-Category--</option>";
   
    if(this.getIssueCategory == 'Direct'){
      direct += "<option value='TDS' > TDS </option>";
      direct += "<option value='TDSNonPayRoll' > TDSNonPayRoll </option>";
      $("#issueSub-Category").html(direct);
    }
    if(this.getIssueCategory == 'InDirect'){
      inDirect += "<option value='GST' > GST </option>";
      inDirect += "<option value='PT' > Professional  Tax </option>";
      $("#issueSub-Category").html(inDirect);
    }
    if(this.getIssueCategory == 'Others'){
      others += "<option value='LIS' > LIS </option>";
      others += "<option value='Legal & Complains' > Legal & Complains</option>";
      others += "<option value='Invoice GST' >Invoice GST</option>";
      others += "<option value='Task Tracking' > Task Tracking</option>";
      $("#issueSub-Category").html(others);
    }
    if(this.getIssueCategory == 'Audit'){
      audit += "<option value='Opening Balance Audit' >Opening Balance Audit</option>";
      audit += "<option value='Sales Audit' >Sales Audit</option>";
      audit += "<option value='Purchase Audit' >Purchase Audit</option>";
      audit += "<option value='Cash Audit' >Cash Audit </option>";
      audit += "<option value='Bank Audit And Reconciliation' >Bank Audit And Reconciliation</option>";
      /* audit += "<option value='Journal Voucher Audit' >Journal Voucher Audit </option>";
      audit += "<option value='Provision Entry Audit' >Provision Entry Audit</option>"; */
      audit += "<option value='Fixed Assets And Depreciation Audit' >Fixed Assets And Depreciation Audit</option>";
      /* audit += "<option value='Secured And Unsecured Loans Ledgers Audit' >Secured And Unsecured Loans Ledgers Audit</option>";
      audit += "<option value='Statutory Audit' >Statutory Audit</option>";
      audit += "<option value='Payroll' >Payroll</option>";
      audit += "<option value='Employee Provident Fund' >Employee Provident Fund</option>";
      audit += "<option value='Employee State Insurance' >Employee State Insurance</option>";
      audit += "<option value='Labour Welfare Fund' >Labour Welfare Fund</option>";
      audit += "<option value='Shops And Establishment Act 1961' >Shops And Establishment Act 1961</option>";
      audit += "<option value='Import Export Council' >Import Export Council</option>";
      audit += "<option value='Small Scale Industries' >Small Scale Industries</option>";
      audit += "<option value='Professional Tax' >Professional Tax</option>";
      audit += "<option value='VAT' >VAT</option>"; */
      $("#issueSub-Category").html(audit);
    }
 
  }

  createTicketAsAssignedUser(){
    const formData = new FormData();
   // formData.append('file', this.getFile);
    formData.append("companyEntity.companyId", this.getcompanyId);
    formData.append("userEntity.userId", this.getRequesterId);
    formData.append("issueCategory", this.getIssueCategory);
    formData.append("issueSubCategory", this.getIssueSubCategory);
    formData.append("issueType", this.getissueType);
    formData.append("issueDescription", this.getDescription);
    formData.append("priority", this.getSeverity);
    if(this.getFile != '' || this.getFile == null) { 
      var file_data = this.getFile; 
      formData.append("file", file_data);
     }
     this.ticketservice.saveTicketAsAsignedUser(formData,this.localStorageUserId)
     .subscribe(response=>{
      if(response.object.success){
        this.responseTicketId = "And Your Ticket Id IS :"+response.object.ticketId;
       this.responseMsg = "Uploaded Succsusfully";
          (<HTMLInputElement>document.getElementById("companyId")).value = '';
          (<HTMLInputElement>document.getElementById("userId")).value = '';
          (<HTMLInputElement>document.getElementById("selectIssueCategory")).value = '';
          (<HTMLInputElement>document.getElementById("issueSub-Category")).value = '';
          (<HTMLInputElement>document.getElementById("issueType")).value = '';
          (<HTMLInputElement>document.getElementById("priority")).value = '';
          (<HTMLInputElement>document.getElementById("issueDescription")).value = '';
          (<HTMLInputElement>document.getElementById("uploadFile")).value = '';
      }else{
       this.responseMsg = "Uploaded UnSuccsusfully";
      }
      })
  
  }
   
  createTicket(){
    const formData = new FormData();
   // formData.append('file', this.getFile);
    // formData.append("companyEntity.companyId", this.getcompanyId);
    // formData.append("userEntity.userId", this.getRequesterId);
    formData.append("issueCategory", this.getIssueCategory);
    formData.append("issueSubCategory", this.getIssueSubCategory);
    formData.append("issueType", this.getissueType);
    formData.append("issueDescription", this.getDescription);
    formData.append("priority", this.getSeverity);
    if(this.getFile != '' || this.getFile == null) { 
      var file_data = $("#uploadFile").prop("files")[0]; 
      formData.append("file", file_data);
     }
     this.ticketservice.saveTicketUser(formData,this.localStorageUserId)
     .subscribe(response=>{
       if(response.object.success){
         this.responseTicketId = "And Your Ticket Id IS :"+response.object.ticketId;
        this.responseMsg = "Uploaded Succsusfully";
        (<HTMLInputElement>document.getElementById("selectIssueCategory")).value = '';
          (<HTMLInputElement>document.getElementById("issueSub-Category")).value = '';
          (<HTMLInputElement>document.getElementById("issueType")).value = '';
          (<HTMLInputElement>document.getElementById("priority")).value = '';
          (<HTMLInputElement>document.getElementById("issueDescription")).value = '';
          (<HTMLInputElement>document.getElementById("uploadFile")).value = '';

       }else{
        this.responseMsg = "Uploaded UnSuccsusfully";
       }
      })
  
  }
 



}
