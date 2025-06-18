import { Component, OnInit } from '@angular/core';
// import { loginDepartment } from "./../../../auth/signup/signup.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  department: any;
  userName: any;
  loggedUser: any;
  user: any;
  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('loggedUser');

    if (this.loggedUser) {
      this.user = JSON.parse(this.loggedUser);
      this.department = this.user.user.department;
      this.userName = this.user.user.userName;

    }
  }
}
