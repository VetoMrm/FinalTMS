import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostComponent } from './modules/post/post.component';
import { DefaultComponent } from './layouts/default/default.component';
import { CreateTicketComponent } from './admin/create-ticket/create-ticket.component';
import { CreateCompanyComponent } from './admin/create-company/create-company.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { CompanyListComponent } from './admin/company-list/company-list.component';
import { LoginComponent } from './login/login/login.component';
import { ModifyUserComponent } from './admin/modify-user/modify-user.component';
import { ModifyCompanyComponent } from './admin/modify-company/modify-company.component';
import { OpenTicketComponent } from './dashtables/open-ticket/open-ticket.component';
import { InProgressTicketComponent } from './dashtables/in-progress-ticket/in-progress-ticket.component';
import { FixedTicketComponent } from './dashtables/fixed-ticket/fixed-ticket.component';
import { HoldTicketComponent } from './dashtables/hold-ticket/hold-ticket.component';
import { ClosedTicketComponent } from './dashtables/closed-ticket/closed-ticket.component';
import { ReOpenTicketComponent } from './dashtables/re-open-ticket/re-open-ticket.component';
import { UpdateCompanyComponent } from './admin/update-company/update-company.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { UserDetailsComponent } from './headerComponents/user-details/user-details.component';
import { ChangePasswordComponent } from './headerComponents/change-password/change-password.component';
import { ContactUsComponent } from './headerComponents/contact-us/contact-us.component';
import { UpdateTicketComponent } from './dashtables/update-ticket/update-ticket.component';


const routes: Routes = [{ path: '', component: LoginComponent },
  { path: 'default', component: DefaultComponent, children:[
  {path:'',component:DashboardComponent},
  {path:'dashboard',component:DashboardComponent}, 
  {path: 'openTicket', component: OpenTicketComponent },
  {path:'inProgressTicket',component:InProgressTicketComponent},
  {path :'fixedTicket',component:FixedTicketComponent},
  {path:'holdTicket',component:HoldTicketComponent},
  {path:'closedTicket',component:ClosedTicketComponent},
  {path:'reOpenTicket',component:ReOpenTicketComponent},
  {path:'posts',component:PostComponent },
  {path:'createTicket',component:CreateTicketComponent },
  {path:'createCompany',component:CreateCompanyComponent },
  {path:'companylist',component:CompanyListComponent },
  {path:'modifyUser',component:ModifyUserComponent },
  {path:'modifyCompany',component:ModifyCompanyComponent },
  {path:'createUser',component:CreateUserComponent },
  {path:'updateCompany/:id',component:UpdateCompanyComponent},
  {path:'updateUser/:id',component:UpdateUserComponent},
  {path:'userDetail',component:UserDetailsComponent},
  {path:'changePassword',component:ChangePasswordComponent},
  {path:'contactUs',component:ContactUsComponent},
  {path:'updateTicket/:id',component:UpdateTicketComponent}
] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
