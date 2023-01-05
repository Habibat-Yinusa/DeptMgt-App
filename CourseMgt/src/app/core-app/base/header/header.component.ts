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
  newDepartment: any;
  username: any;
  userName: any;
  ngOnInit(): void {
    this.department = localStorage.getItem('department');
    this.username = localStorage.getItem('username');

    if (this.department && this.username) {
      this.newDepartment = JSON.parse(this.department);
      this.userName = JSON.parse(this.username);
    }
  }
}
