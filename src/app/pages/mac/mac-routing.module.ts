import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MacComponent } from './mac.component';

const routes: Routes = [{ path: '', component: MacComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MacRoutingModule { }
