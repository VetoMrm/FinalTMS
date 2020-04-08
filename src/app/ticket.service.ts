import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http : HttpClient) { }

  private baseUrl = 'http://localhost:8080/ticket/getAllUsersByCompanyId';
  private baseUrl1 = 'http://localhost:8080/ticket/saveTicketDetailsAsAssinner';
  private baseUrl2 = 'http://localhost:8080/ticket/saveTicketDetails';

  private baseUrl3 = 'http://localhost:8080/ticket/getAdminOpenTicket';
  private baseUrl4 = 'http://localhost:8080/ticket/getUserOpenTicket';
  private baseUrl5 = 'http://localhost:8080/ticket/getAssigneeOpenTicket';

  private baseUrl6 = 'http://localhost:8080/ticket/deleteTicket';

  private baseUrl7 = 'http://localhost:8080/ticket/getAdminInProgressTicket';
  private baseUrl8 = 'http://localhost:8080/ticket/getUserInProgressTicket';
  private baseUrl9 = 'http://localhost:8080/ticket/getAssigneeInProgressTicket';

  private baseUrl10 = 'http://localhost:8080/ticket/getAdminFixedTicket';
  private baseUrl11 = 'http://localhost:8080/ticket/getUserFixedTicket';
  private baseUrl12 = 'http://localhost:8080/ticket/getAssigneeFixedTicket';


  private baseUrl13 = 'http://localhost:8080/ticket/getAdminHoldTicket';
  private baseUrl14 = 'http://localhost:8080/ticket/getUserHoldTicket';
  private baseUrl15 = 'http://localhost:8080/ticket/getAssigneeHoldTicket';

  private baseUrl16 = 'http://localhost:8080/ticket/getAdminReOpenTicket';
  private baseUrl17 = 'http://localhost:8080/ticket/getUserReOpenTicket';
  private baseUrl18 = 'http://localhost:8080/ticket/getAssigneeReOpenTicket';

  private baseUrl19 = 'http://localhost:8080/ticket/getAdminClosedTicket';
  private baseUrl20 = 'http://localhost:8080/ticket/getUserClosedTicket';
  private baseUrl21 = 'http://localhost:8080/ticket/getAssigneeClosedTicket';

  private baseUrl22 = 'http://localhost:8080/ticket/getTicketById';
  private baseUrl23 = 'http://localhost:8080/ticket/updateTicketToDB';


  getAllUsersListByCompanyId(cid:number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${cid}`);
  }

  saveTicketAsAsignedUser(formData,uId): Observable<any>{
   return this.http.post(`${this.baseUrl1}/${uId}`,formData);
  }

  saveTicketUser(formData,uId): Observable<any>{
    return this.http.post(`${this.baseUrl2}/${uId}`,formData);
   }

   getAdminOpenTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl3}/${userId}`);
   }

   getUserOpenTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl4}/${userId}`);
   }

   getAssignedUserOpenTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl5}/${userId}`);
   }

   deleteTicket(tId:number): Observable<any>{
    return this.http.delete(`${this.baseUrl6}/${tId}`);
   }

   getAdminInProgressTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl7}/${userId}`);
   }

   getUserInProgressTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl8}/${userId}`);
   }

   getAssignedUserInProgressTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl9}/${userId}`);
   }

   getAdminFixedTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl10}/${userId}`);
   }

   getUserFixedTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl11}/${userId}`);
   }

   getAssignedUserFixedTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl12}/${userId}`);
   }

   getAdminHoldTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl13}/${userId}`);
   }

   getUserHoldTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl14}/${userId}`);
   }

   getAssignedUserHoldTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl15}/${userId}`);
   }

   getAdminReOpenTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl16}/${userId}`);
   }

   getUserReOpenTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl17}/${userId}`);
   }

   getAssignedUserReOpenTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl18}/${userId}`);
   }

   getAdminClosedTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl19}/${userId}`);
   }

   getUserClosedTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl20}/${userId}`);
   }

   getAssignedUserClosedTickets(userId:number): Observable<any>{
    return this.http.get(`${this.baseUrl21}/${userId}`);
   }

   getTicketByTicketId(tId:number): Observable<any>{
    return this.http.get(`${this.baseUrl22}/${tId}`);
   }

   updateTicketToDB(formData,tId:number,uId:number): Observable<any>{
     return this.http.put(`${this.baseUrl23}/${tId}/${uId}`,formData);
   }
}
