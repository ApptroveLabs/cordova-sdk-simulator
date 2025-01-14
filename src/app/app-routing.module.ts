import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';  // Import HomePage directly


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
