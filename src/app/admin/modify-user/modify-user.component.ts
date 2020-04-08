import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, MatPaginator } from '@angular/material';
import { LoginService } from 'src/app/login.service';
import { Company } from 'src/app/company';
import { Router } from '@angular/router';


export interface UserList {
  userId: number;
  companyEntity:{
    companyName: string;
   }
  username: String;
  displayName: string;
  designationEntity:{
    companyName: string;
   }
  email: string;

}

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit  {

  
  designation;
  userId;
  responseMsg;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
    this.designation = localStorage.getItem('designation');
    this.userId = localStorage.getItem('userId');

    if(this.designation=='SuperAdmin'){
       this.getUserListForSuperAdmin();
    }
    if(this.designation=='Admin'){
      this.getUserListForAdmin(this.userId);
    }

  }
  displayedColumns: string[] = ['userId','companyEntity', 'username', 'displayName','designationEntity','email','action'];
  dataSource:MatTableDataSource<UserList>;

  getUserListForSuperAdmin(){
   this.loginService.getUserListForSuperAdmin()
   .subscribe(response=>{
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
  }

  getUserListForAdmin(id:number){
   this.loginService.getUserListForAdmin(id)
   .subscribe(response=>{
     this.dataSource = new MatTableDataSource(response);
     this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
   })
  }

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  deleteUser(element){
   if(confirm("Do you Realy Want to delete this user?"))
    this.loginService.deleteUser(element.userId)
    .subscribe(response=>{
      if(response.success){
        if(this.designation=='SuperAdmin'){
          this.getUserListForSuperAdmin();
       }
       if(this.designation=='Admin'){
         this.getUserListForAdmin(this.userId);
       }
      }else{
         this.responseMsg = "fail to delete";
      }
    })
  }

  updateUser(element){
    let id = element.userId
    this.router.navigate(['/default/updateUser',id]);
  }

}
