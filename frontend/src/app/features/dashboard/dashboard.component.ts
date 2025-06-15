import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { CardDashboardComponent } from '../../components/card-dashboard/card-dashboard.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RoundPipe } from '../../pipes/round.pipe';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardDashboardComponent,
    CardDashboardComponent,
    SidebarComponent,
    SidebarComponent,
    RoundPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private weatherAPI = inject(WeatherService);
  private isLoading = inject(LoadingService);

  country: number = 1;

  condition: any = {};
  countries: any[] = [];
  localtime: any = {};
  location: any = {};
  tasks: any[] = [];
  timezones: any[] = [];

  ngOnInit(): void {
    this.getWeatherInfo(1, 1);
  }

  changeTimezone(timezone: number): void {
    this.getWeatherInfo(this.country, timezone);
  }

  async getWeatherInfo(location: number, timezone: number): Promise<void> {
    this.isLoading.show();

    await this.weatherAPI
      .weather(location, timezone)
      .pipe(
        finalize(() => {
          this.isLoading.hide();
        })
      )
      .subscribe({
        next: (response: any) => {
          this.condition = response.condition;
          this.countries = response.countries;
          this.localtime = response.localtime;
          this.location = response.location;
          this.tasks = response.tasks;
          this.timezones = response.timezones;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  changeCountry(country: number): void {
    this.country = country;
    this.getWeatherInfo(country, 0)
  }
}
