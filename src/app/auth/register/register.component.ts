import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'trishapp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    repeatPassword: new FormControl('',[
      Validators.required, 
      this.passwordsMatchValidator
    ])
  });
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  passwordsMatchValidator(control: FormControl) {
    const password = control.root.get('password');
    return (password && control.value !== password.value) ? 
    {
      passwordMismatch: true
    } :
    null;
  }

  register() {
    if(!this.userForm.valid) return;
    const user = this.userForm.getRawValue();
    this.authService
      .register(user)
      .subscribe(s => this.router.navigate(['/']));
  }

  get fullName() {
    return this.userForm.get('fullName');
  }
  get email() {
    return this.userForm.get('email');''
  }
  get password() {
    return this.userForm.get('password');
  } 
  get repeatPassword() {
    return this.userForm.get('repeatPassword');
  }
}
