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
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  // ✅ needed for formGroup & formControlName
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  private formbuilder = inject(FormBuilder);

registerForm = this.formbuilder.group({
  name: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  isFarmer: [false],   // ✅ camelCase
});

  authservice=inject(Auth);
  Router=inject(Router);
  register() {
  console.log(this.registerForm.value);
  const values = this.registerForm.value;
  this.authservice.register(values.name!, values.email!, values.password!, values.isFarmer!).subscribe({
    next: (res) => {
      console.log(res);
      alert('Registration successful!');
      this.Router.navigate(['/login']);
    },
    error: (err) => {
      console.error(err);
      alert('Registration failed!');
    }
  });
}
}
