import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'iphone', loadChildren: () => import('./pages/iphone/iphone.module').then(m => m.IphoneModule) },
  { path: 'mac', loadChildren: () => import('./pages/mac/mac.module').then(m => m.MacModule) },
  { path: 'ipad', loadChildren: () => import('./pages/ipad/ipad.module').then(m => m.IpadModule) },
  { path: 'watch', loadChildren: () => import('./pages/watch/watch.module').then(m => m.WatchModule) },
  { path: 'product-configurator', loadChildren: () => import('./pages/product-configurator/product-configurator.module').then(m => m.ProductConfiguratorModule) },
  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
