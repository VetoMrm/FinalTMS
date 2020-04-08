import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { RouterModule } from '@angular/router';
import { Ng2OdometerModule } from 'ng2-odometer';
import { MatInputModule, MatFormFieldModule, MatTableModule, MatIconModule } from '@angular/material';
import { LoginModule } from './login/login.module';
import { MatPaginatorModule } from '@angular/material';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashtablesModule } from './dashtables/dashtables.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './headerComponents/user-details/user-details.component';
import { ContactUsComponent } from './headerComponents/contact-us/contact-us.component';
import { ChangePasswordComponent } from './headerComponents/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserDetailsComponent,
    ContactUsComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatButtonModule,
    DefaultModule,
    RouterModule, 
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LoginModule,
    MatPaginatorModule,
    Ng2OdometerModule.forRoot(),
    DashtablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
