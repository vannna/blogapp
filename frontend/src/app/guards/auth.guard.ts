import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const requiredRole = route.data['role'] as string;

  if (!authService.getToken()) return false;

  const userRole = authService.getCurrentUserRole();
  if (requiredRole && userRole !== requiredRole) {
    alert('You do not have permission to access this page');
    return false;
  }
  return true;
};
