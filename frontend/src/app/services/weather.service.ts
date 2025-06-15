import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private localStorage: Storage | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
    }
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.localStorage) {
      const token = this.localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }


  getQuery(query: string) {
    const url = `${environment.url}${query}`;
    const headers = this.getAuthHeaders();
    return this.http.get(url, { headers });
  }

  postQuery(query: string, data: any) {
    const url = `${environment.url}${query}`;
    const headers = this.getAuthHeaders();
    return this.http.post(url, data, { headers });
  }

  putQuery(query: string, data: any) {
    const url = `${environment.url}${query}`;
    const headers = this.getAuthHeaders();
    return this.http.put(url, data, { headers });
  }

  deleteQuery(query: string) {
    const url = `${environment.url}${query}`;
    const headers = this.getAuthHeaders();
    return this.http.delete(url, { headers });
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.localStorage?.getItem('token');
      return token !== null;
    }
    
    return false;
  }

  login(form: any) {
    return this.postQuery('auth/login', form);
  }

  register(form: any) {
    return this.postQuery('auth/register', form);
  }

  weather(location: number, timezone: number) {
    return this.getQuery(
      `weather?location=${location}${
        timezone > 0 ? `&timezone=${timezone}` : ''
      }`
    );
  }

  users() {
    return this.getQuery(`users/all`);
  }
}