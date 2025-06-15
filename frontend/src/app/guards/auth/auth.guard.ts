import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (!token) {
      router.navigate(['/auth/login']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigate(['/auth/login']);
        return false;
      }

      return true;
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.navigate(['/auth/login']);
      return false;
    }
  } else {
    return true;
  }
};
