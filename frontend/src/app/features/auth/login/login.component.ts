import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { WeatherService } from '../../../services/weather.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { CardComponent } from '../../../components/card/card.component';
import { LoadingService } from '../../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    InputComponent,
    CardComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private weatherAPI = inject(WeatherService);
  private isLoading = inject(LoadingService);
  private route = inject(Router);
  private fb = inject(FormBuilder);
  loginForm: FormGroup;
  apiError: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  async onSubmit(): Promise<void> {
    this.isLoading.show();

    this.apiError = null;

    if (this.loginForm.valid) {
      this.weatherAPI
        .login(this.loginForm.value)
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
              this.apiError = response.message || 'Credenciales incorrectas.';
            }
          },
          error: (error: any) => {
            console.error('Error de la API al iniciar sesión:', error);
            if (error.status === 401 || error.status === 403) {
              this.apiError = 'Email o contraseña incorrectos.';
            } else if (error.error && error.error.message) {
              this.apiError = error.error.message;
            } else {
              this.apiError =
                'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
            }
          },
        });
    } else {
      this.apiError = 'Por favor, corrige los errores en el formulario.';
      this.isLoading.hide();
    }
  }
}
