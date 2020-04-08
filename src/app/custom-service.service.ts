import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CustomServiceService {

  private baseUrl = 'http://localhost:8080/user/getUserDetailById';
  private baseUrl1 = 'http://localhost:8080/contactCompany';
  private baseUrl2 = 'http://localhost:8080/changePassword';


  constructor(private http :HttpClient) { }

   getUserDetailById(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

   saveContactUs(formData): Observable<any>{
    return this.http.post(`${this.baseUrl1}`,formData);
   }

   changePassword(user:User): Observable<any>{
     return this.http.put(`${this.baseUrl2}`,user);
   }


}
