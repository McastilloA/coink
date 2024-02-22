import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then((m) => m.routes),
  },
  {
    path: '404',
    loadChildren: () => import('./shared/pages/pages.routes').then(m => m.routes)
  },
  {
    path: "**",
    redirectTo: "404"
  }
];
