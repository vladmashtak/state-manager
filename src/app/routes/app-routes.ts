import { Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { GisComponent } from '../pages/gis/gis.component';

import { AuthGuardService as AuthGuard } from '../api/auth/auth-guard.service';


export const routes: Routes = [
  { path: '',
    redirectTo: '/gis',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'gis',
        component: GisComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ]
  },

];
