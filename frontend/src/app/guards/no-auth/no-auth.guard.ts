import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (!token) {
      return true;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
      }

      router.navigate(['/panel/dashboard']);
      return false;
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }
  } else {
    return true;
  }
};
