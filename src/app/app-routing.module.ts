import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';  // Import HomePage directly


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  {
    path: 'built-in-events',
    loadChildren: () => import('./built-in-events/built-in-events.module').then( m => m.BuiltInEventsPageModule)
  },
  {
    path: 'customs-events',
    loadChildren: () => import('./customs-events/customs-events.module').then( m => m.CustomsEventsPageModule)
  },
  {
    path: 'deep-linking',
    loadChildren: () => import('./deep-linking/deep-linking.module').then( m => m.DeepLinkingPageModule)
  },
  {
    path: 'product-page',
    loadChildren: () => import('./product-page/product-page.module').then( m => m.ProductPagePageModule)
  },
  {
    path: 'cake-screen',
    loadChildren: () => import('./cake-screen/cake-screen.module').then( m => m.CakeScreenPageModule)
  },
  {
    path: 'add-to-cart-screen',
    loadChildren: () => import('./add-to-cart-screen/add-to-cart-screen.module').then( m => m.AddToCartScreenPageModule)
  },
  {
    path: 'dynamic-link',
    loadChildren: () => import('./dynamic-link/dynamic-link.module').then( m => m.DynamicLinkPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'complete-event',
    loadChildren: () => import('./complete-event/complete-event.module').then( m => m.CompleteEventPageModule)
  },
  {
    path: 'campaign-data',
    loadChildren: () => import('./campaign-data/campaign-data.module').then( m => m.CampaignDataPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
