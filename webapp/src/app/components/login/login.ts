
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  authservice=inject(Auth);
  router=inject(Router);
login() {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value as { email: string; password: string };

  this.authservice.login(email, password).subscribe((res: any) => {
    console.log('Response:', res);

    localStorage.setItem('token', res.jwtToken ?? '');
    localStorage.setItem('isFarmer', String(res.existingUser.isFarmer ?? ''));
    localStorage.setItem('user', JSON.stringify(res.existingUser ?? {}));
    this.router.navigate(['/']);
  });
}


}


