import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.loading = true;

    this.authService.login(credentials)
    .subscribe(
      user => {
        console.log(user);
        this.snackBar.open(
          'Logged in sucessfuly, Welcome ' + user.firstName + '!', 'OK',
           {duration: 2000});
           this.router.navigateByUrl('/');
           this.loading = false;
          }, 
      err => {
        console.log(err);
        this.snackBar.open(
          'Logged Error ', 'OK',
           {duration: 2000});
           this.loading = false;
      }
    )
  }

}
