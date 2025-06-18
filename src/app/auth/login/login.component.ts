import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/api/data.service';
import { checkUser } from 'src/app/model/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any;
  match: boolean = false;
  loginUserData: any;
  userLoginData: any;
  payload = new checkUser();
  errmsg: any;
  constructor(
    private fb: FormBuilder,
    private app: DataService,
    private router: Router
  ) { }
  loginForm: any;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  getUsers() {
    this.loginUserData = this.loginForm.value;
    this.app.getUsers().subscribe({
      next: (res) => {
        this.userData = res;
        console.log('from json', this.userData);
        console.log('from form', this.loginUserData);
        this.router.navigate(['/app/level']);

        // console.log('Your form data : ', form.value);
        // this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {

        //   if (res.status) {

        //     // this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        //     // this._auth.setDataInLocalStorage('token', res.token);
        //     this.router(['/level']);
        //   }
        // })

        // if (
        //   this.loginForm.username === this.userData.username &&
        //   this.loginForm.password === this.userData.password
        // ) {
        //   this.match = true;
        // }
      },
      error: (err) => {
        // console.log(err.error, 'error');
      },
    });
  }

  userLogin() {
  this.errmsg = '';

  const form = this.loginForm.value;
  this.payload.email = form.email;
  this.payload.password = form.password;

  this.app.loginUser(this.payload).subscribe({
    next: (res) => {
      console.log(res, 'res');
      // Save response (token or user info)
      localStorage.setItem('loggedUser', JSON.stringify(res));

      // Navigate to dashboard
      this.router.navigate(['/app/level']);
    },
    error: (err) => {
      console.log(err);

      this.errmsg = err.error?.message || 'Error connecting to database';
      setTimeout(() => {
        this.errmsg = '';
      }, 5000);
    },
  });
}
}
