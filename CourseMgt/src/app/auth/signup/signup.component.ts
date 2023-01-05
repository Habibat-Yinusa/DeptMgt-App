import { DataService } from 'src/app/api/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { newUser } from './../../model/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  disable: boolean = false;
  name: string = '';
  // currentDepartment: string = '';
  lastname: string = '';
  signUpForm: any;
  payload = new newUser();
  userList: any[] = [];
  // department: string = '';

  constructor(
    private fb: FormBuilder,
    private app: DataService,
    private router: Router
  ) {}
  /**
   * loginDepartment
   */
  public loginDepartment() {
    this.loginDepartment = this.signUpForm.value.department;
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      middlename: [''],
      department: ['', Validators.required],
      faculty: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
  setStorage() {
    localStorage.setItem('userDetails', JSON.stringify(this.signUpForm.value));

    const form = this.signUpForm.value;
    console.log(form, 'this form');

    this.payload.username = form.username;
    this.payload.firstname = form.firstname;
    this.payload.lastname = form.lastname;
    this.payload.middlename = form.middlename;
    this.payload.email = form.email;
    this.payload.department = form.department;
    this.payload.faculty = form.faculty;
    this.payload.password = form.password;
    this.payload.confirmpassword = form.confirmPassword;
    console.log(this.payload);
    this.app.setUser(this.payload).subscribe({
      next: (res) => {
        this.userList.push(res);

        this.router.navigate(['/']);
        // this.router.navigate(['/app/records'])
      },
    });

    console.log(this.userList);

    let department = this.signUpForm.get('department');
    let username = this.signUpForm.get('username');
    localStorage.setItem('department', JSON.stringify(department.value));
    localStorage.setItem('username', JSON.stringify(username.value));
    console.log(department, 'department');
  }
}
