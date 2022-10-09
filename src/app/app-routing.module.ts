import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';

const loginModule = () =>
  import('./modules/login/login.module').then((m) => m.LoginModule);
const landingModule = () =>
  import('./modules/landing/landing.module').then((m) => m.LandingModule);
const coreModule = () =>
  import('./modules/core/core.module').then((m) => m.CoreModule);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: loginModule },
  { path: 'home', loadChildren: landingModule, canActivate: [AuthGuard] },
  { path: 'error', loadChildren: coreModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
