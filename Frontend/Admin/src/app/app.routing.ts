import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { GloginGuard } from './guards/glogin.guard';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { MedicinaGeneralCitasComponent } from './views/MedicinaGeneral/medicina-general-citas/medicina-general-citas.component';
import { MedicinaGeneralDatosPacientesComponent } from './views/MedicinaGeneral/medicina-general-datos-pacientes/medicina-general-datos-pacientes.component';
import { MedicinaGeneralComponent } from './views/MedicinaGeneral/medicina-general/medicina-general.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    canActivate:[GloginGuard],
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[GloginGuard],
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate:[GloginGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'medicinageneral',
        loadChildren: () => import('./views/MedicinaGeneral/medicina-general/medicina-general.module').then(m => m.MedicinaGeneralModule)
      },
      {
        path: 'medicinageneralcitas',
        loadChildren: () => import('./views/MedicinaGeneral/medicina-general-citas/medicina-general-citas.module').then(m => m.MedicinaGeneralCitasModule)
      },
      {
        path: 'medicinageneralconsultas',
        loadChildren: () => import('./views/MedicinaGeneral/medicina-general-consultas/medicina-general-consultas.module').then(m => m.MedicinaGeneralConsultasModule)
      },
      {
        path: 'medicinageneraldatospacientes',
        loadChildren: () => import('./views/MedicinaGeneral/medicina-general-datos-pacientes/medicina-general-datos-pacientes.module').then(m => m.MedicinaGeneralDatosPacientesModule)
      },








      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}