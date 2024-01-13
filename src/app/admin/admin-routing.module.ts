import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashLoginComponent } from './dash-login/dash-login.component';
import { gardGuard } from '../model/gards/gard.guard';

const routes: Routes = [
    {path:"admin-login-dash",component:DashLoginComponent},
    {path:"admin",component:AdminComponent, children:[ ], canActivate:[gardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
