import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';

export const authGuard: CanMatchFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const ecommerceService = inject(EcommerceService);

  if (!ecommerceService.hasOnboardingBeenSeen()) {
    return router.createUrlTree(['/onboarding']);
  }

  if (!ecommerceService.hasActiveUserSession()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
