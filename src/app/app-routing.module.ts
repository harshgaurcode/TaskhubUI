import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main-layout/layout.module').then((m) => m.LayoutModule),
    // canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth ',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
