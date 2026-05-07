import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { sessionOrDeeplinkGuard } from './guards/session-or-deeplink.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage), canMatch: [authGuard] },
  {
    path: 'built-in-events',
    loadChildren: () => import('./built-in-events/built-in-events.module').then(m => m.BuiltInEventsPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'builtInEvents',
    loadChildren: () => import('./built-in-events/built-in-events.module').then(m => m.BuiltInEventsPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'customs-events',
    loadChildren: () => import('./customs-events/customs-events.module').then(m => m.CustomsEventsPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'customsEvents',
    loadChildren: () => import('./customs-events/customs-events.module').then(m => m.CustomsEventsPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'campaign-data',
    loadChildren: () => import('./campaign-data/campaign-data.module').then(m => m.CampaignDataPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'campaignData',
    loadChildren: () => import('./campaign-data/campaign-data.module').then(m => m.CampaignDataPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'deep-linking',
    loadComponent: () => import('./deep-linking/deep-linking.page').then(m => m.DeepLinkingPage),
    canMatch: [authGuard]
  },
  {
    path: 'deepLinking',
    loadComponent: () => import('./deep-linking/deep-linking.page').then(m => m.DeepLinkingPage),
    canMatch: [authGuard]
  },
  {
    path: 'dynamic-link',
    loadComponent: () => import('./dynamic-link/dynamic-link.page').then(m => m.DynamicLinkPage),
    canMatch: [authGuard]
  },
  {
    path: 'dynamicLink',
    loadComponent: () => import('./dynamic-link/dynamic-link.page').then(m => m.DynamicLinkPage),
    canMatch: [authGuard]
  },
  {
    path: 'product-page',
    loadChildren: () => import('./product-page/product-page.module').then( m => m.ProductPagePageModule),
    canMatch: [authGuard]
  },
  {
    path: 'productPage',
    loadChildren: () => import('./product-page/product-page.module').then(m => m.ProductPagePageModule),
    canMatch: [authGuard]
  },
  {
    path: 'addtocart',
    loadChildren: () => import('./add-to-cart-screen/add-to-cart-screen.module').then(m => m.AddToCartScreenPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'add-to-cart-screen',
    loadChildren: () => import('./add-to-cart-screen/add-to-cart-screen.module').then(m => m.AddToCartScreenPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'addToCartScreen',
    loadChildren: () => import('./add-to-cart-screen/add-to-cart-screen.module').then(m => m.AddToCartScreenPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'cake-screen',
    loadChildren: () => import('./cake-screen/cake-screen.module').then( m => m.CakeScreenPageModule),
    canActivate: [sessionOrDeeplinkGuard]
  },
  {
    path: 'cakeActivity',
    loadChildren: () => import('./cake-screen/cake-screen.module').then(m => m.CakeScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule),
    canActivate: [sessionOrDeeplinkGuard]
  },
  {
    path: 'complete-event',
    loadChildren: () => import('./complete-event/complete-event.module').then(m => m.CompleteEventPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'completeEvent',
    loadChildren: () => import('./complete-event/complete-event.module').then(m => m.CompleteEventPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canMatch: [authGuard]
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canMatch: [authGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
