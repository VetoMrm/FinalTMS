import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { LoginService } from 'src/app/login.service';
import { Observable } from 'rxjs';
import { Company } from 'src/app/company';
import { Router } from '@angular/router';

export interface CompanyList {
  companyId:number;
  companyName: string;
    
}

@Component({
  selector: 'app-modify-company',
  templateUrl: './modify-company.component.html',
  styleUrls: ['./modify-company.component.css']
})
export class ModifyCompanyComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  responseMsg;
  

  constructor(private loginService : LoginService,private router:Router) { }

  ngOnInit() {
    this.getCompanyList();
  }

  displayedColumns: string[] = ['companyId', 'companyName', "action"];
  dataSource :MatTableDataSource<CompanyList>;
   
  getCompanyList(){
    this.loginService.getAllCompanyList()
   .subscribe(response=>{
     this.dataSource = new MatTableDataSource(response);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
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

  updateComapny(element){
    let id = element.companyId;
    this.router.navigate(['/default/updateCompany',id]);
  }

  delateComapny(element){
    if(confirm("Do you realy want to delete this company?"))
    this.loginService.deleteCompany(element.companyId)
    .subscribe(response=>{
      if(response.success){
        this.getCompanyList();
      }else{
         this.responseMsg = "fail to delete";
      }
    })
  }

}