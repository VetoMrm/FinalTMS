import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  one = "primary";

  @Output() toggleSideBarForMe:EventEmitter<any>=new EventEmitter()   
  constructor(private router: Router) {}

  ngOnInit() {
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  logOut(){
    localStorage.clear();
  this.router.navigate(['']);
  }
  
  themes0() {
    this.one = "primary";
  }

  themes1() {
    this.one = "accent";
  }

  themes3() {
    this.one = "warn";
  }

  themes(): string {

    return this.one;
  }
}
