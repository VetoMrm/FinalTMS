import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomServiceService } from 'src/app/custom-service.service';
declare var $: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public username: string ;
  public Designation : string;
  public email : string ;
  public registration : string;

  constructor(private router:Router,private customService : CustomServiceService) { }

  ngOnInit() {
  
  this.username = localStorage.getItem('userName');
   this.Designation = localStorage.getItem('designation');
   this.email = localStorage.getItem('email');
   this.registration = localStorage.getItem('registrationDate')
    
  }

  hideThis(){
    $("#userDetail").hide();
    this.router.navigate(['/default']);

  }

}
