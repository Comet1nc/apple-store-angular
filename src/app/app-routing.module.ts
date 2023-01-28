import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'iphone', loadChildren: () => import('./pages/iphone/iphone.module').then(m => m.IphoneModule) },
  { path: 'mac', loadChildren: () => import('./pages/mac/mac.module').then(m => m.MacModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
