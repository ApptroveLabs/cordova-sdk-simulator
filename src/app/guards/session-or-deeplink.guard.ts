import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';

export const sessionOrDeeplinkGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree => {
  const router = inject(Router);
  const ecommerceService = inject(EcommerceService);

  if (route.queryParamMap.get('deeplink') === '1') {
    return true;
  }

  if (ecommerceService.hasActiveUserSession()) {
    return true;
  }

  return ecommerceService.hasOnboardingBeenSeen()
    ? router.createUrlTree(['/login'])
    : router.createUrlTree(['/onboarding']);
};
