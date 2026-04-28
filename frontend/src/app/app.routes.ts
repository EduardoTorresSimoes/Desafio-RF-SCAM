import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'departamentos', pathMatch: 'full' },
  {
    path: 'departamentos',
    loadComponent: () => import('./departamento/departamento').then(m => m.DepartamentoComponent)
  },
  {
    path: 'empregados',
    loadComponent: () => import('./empregado/empregado').then(m => m.EmpregadoComponent)
  }
];
