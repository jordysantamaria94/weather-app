import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WeatherService } from '../../../services/weather.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../components/input/input.component';
import { CardComponent } from '../../../components/card/card.component';
import { LoadingService } from '../../../services/loading.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    CardComponent,
    CardComponent,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private weatherAPI = inject(WeatherService);
  private isLoading = inject(LoadingService);
  private route = inject(Router);
  private fb = inject(FormBuilder);
  registerForm: FormGroup;

  apiError: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeat: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get nameControl(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get repeatControl(): FormControl {
    return this.registerForm.get('repeat') as FormControl;
  }

  async onSubmit(): Promise<void> {
    this.isLoading.show();
    this.apiError = ''

    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.repeat) {
        this.apiError = "Las contraseñas no coinciden"
        this.isLoading.hide();
        return;
      }

      this.weatherAPI
        .register(this.registerForm.value)
        .pipe(
          finalize(() => {
            this.isLoading.hide();
          })
        )
        .subscribe({
          next: (response: any) => {
            if (response.flag) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));

              this.route.navigate(['/panel/dashboard']);
            } else {
              this.apiError = response.error
            }
          },
          error: (err: any) => {
            this.apiError = err.error.error;
          },
        });
    }
  }
}
