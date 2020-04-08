import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 

  private baseUrl = 'http://localhost:8080/index';
  private baseUrl1 = 'http://localhost:8080/company/createCompany';
  private baseUrl2 = 'http://localhost:8080/company/getAllCompany';
  private baseUrl3 = 'http://localhost:8080/user/saveUser';
  private baseUrl4 = 'http://localhost:8080/user/createUser';
  private baseUrl5 = 'http://localhost:8080/company/deleteCompany';
  private baseUrl6 = 'http://localhost:8080/company/getCompanyById';
  private baseUrl7 = 'http://localhost:8080/company/updateCompanyToDb';
  private baseUrl8 = 'http://localhost:8080/user/getAllUserListForSuperAdmin';
  private baseUrl9 = 'http://localhost:8080/user/getAllUserListForAdmin';
  private baseUrl10 = 'http://localhost:8080/user/deleteUser';
  private baseUrl11 = 'http://localhost:8080/user/getUserDetailById';
  private baseUrl12 = 'http://localhost:8080/user/userUpdateToDb';
  private baseUrl13 = 'http://localhost:8080/forgotPassword';
  private baseUrl14 = 'http://localhost:8080/company/checkCompanyNameAlreadyExistOrNot';
  private baseUrl15 = 'http://localhost:8080/user/checkUserNameAlreadyExistOrNot';
  private baseUrl16 = 'http://localhost:8080/user/checkEmailIdAlreadyExistOrNot';
  private baseUrl17 = 'http://localhost:8080/user/checkUserNameAlreadyExistOrNotForUpdate';
  private baseUrl18 = 'http://localhost:8080/user/checkEmailIdAlreadyExistOrNotForUpdate';
  private baseUrl19 = 'http://localhost:8080/home';
  private baseUrl20 = 'http://localhost:8080/company/checkCompanyNameAlreadyExistOrNotForUpdate';





 
  constructor(private http: HttpClient) { }

   checkUserCredentials(user:User): Observable<any>{
   return this.http.post(`${this.baseUrl}`,user);
   }

   createCompany(company:Company): Observable<any>{
    return this.http.post(`${this.baseUrl1}`,company);
   }

   getAllCompanyList(): Observable<any>{
     return this.http.get(`${this.baseUrl2}`);
   }

   createUser(user:User): Observable<any>{
     let dId = user.designationId;
     let cId = user.companyId;
    return this.http.post(`${this.baseUrl3}/${dId}/${cId}`,user);
   }


   getUserDetails(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl4}/${id}`);
   }

   deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl5}/${id}`);
  }
   
  getCompanyDetailById(id:number): Observable<any>{
  return this.http.get(`${this.baseUrl6}/${id}`);
  }

  updateCompanyToDbById(company:Company,id:number): Observable<any>{
    return this.http.put(`${this.baseUrl7}/${id}`,company);
  }
  
   getUserListForSuperAdmin(): Observable<any>{
    return this.http.get(`${this.baseUrl8}`);
   }

   getUserListForAdmin(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl9}/${id}`);
   }

   deleteUser(id:number): Observable<any>{
   return this.http.delete(`${this.baseUrl10}/${id}`);
   }

   getUserDetailById(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl11}/${id}`);
   }

   updateUserToDb(user:User): Observable<any>{
     let uId = user.userId;
     let cId = user.companyId;
     let dId = user.designationId;
    return this.http.put(`${this.baseUrl12}/${uId}/${cId}/${dId}`,user);
   }

   forgotPassword(email:string): Observable<any>{
     return this.http.get(`${this.baseUrl13}/${email}`);
   }

   toCheckCompanyNameAlreadyExixtOrNot(cName:number): Observable<any>{
    return this.http.get(`${this.baseUrl14}/${cName}`);
  }

  toCheckEmailIdAlreadyExistOrNot(email:string): Observable<any>{
    return this.http.get(`${this.baseUrl16}/${email}`);
  }

  toCheckUserNameAlreadyExistOrNot(userName:string): Observable<any>{
    return this.http.get(`${this.baseUrl15}/${userName}`);
  }

  toCheckEmailIdAlreadyExistOrNotForUpdate(email:string,uId:number): Observable<any>{
    return this.http.get(`${this.baseUrl18}/${email}/${uId}`);
  }

  toCheckUserNameAlreadyExistOrNotForUpdate(userName:string,uId:number): Observable<any>{
    return this.http.get(`${this.baseUrl17}/${userName}/${uId}`);
  }
  getHomeDetails(uId,designation): Observable<any>{
    return this.http.get(`${this.baseUrl19}/${uId}/${designation}`);
  }

  toCheckCompanyNameAlreadyExistOrNotForUpdate(companyName:string,cId:number): Observable<any>{
    return this.http.get(`${this.baseUrl20}/${companyName}/${cId}`);
  }

  }
