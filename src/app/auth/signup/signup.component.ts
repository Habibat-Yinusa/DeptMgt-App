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
  lastName: string = '';
  signUpForm: any;
  payload = new newUser();
  userList: any[] = [];
  loading: boolean = false;
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
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      middleName: [''],
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
  this.loading = true;

  localStorage.setItem('userDetails', JSON.stringify(this.signUpForm.value));

  const form = this.signUpForm.value;
  console.log(form, 'this form');

  this.payload.userName = form.userName;
  this.payload.firstName = form.firstName;
  this.payload.lastName = form.lastName;
  this.payload.middleName = form.middleName;
  this.payload.email = form.email;
  this.payload.department = form.department;
  this.payload.faculty = form.faculty;
  this.payload.password = form.password;
  this.payload.confirmPassword = form.confirmPassword;

  console.log(this.payload);

  this.app.setUser(this.payload).subscribe({
    next: (res) => {
      this.userList.push(res);
      this.loading = false;

      this.router.navigate(['/']);
      // this.router.navigate(['/app/records']);
    },
    error: (err) => {
      console.error('Error signing up:', err);
      this.loading = false;
    }
  });

  console.log(this.userList);

  let department = this.signUpForm.get('department');
  let userName = this.signUpForm.get('userName');
  localStorage.setItem('department', JSON.stringify(department.value));
  localStorage.setItem('userName', JSON.stringify(userName.value));
  console.log(department, 'department');
}

}
