import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { EmployeeList } from './pages/employee-list/employee-list';
import { EmployeeForm } from './pages/employee-form/employee-form';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'employee-list', component: EmployeeList, canActivate: [AuthGuard] },
  { path: 'employee-form', component: EmployeeForm, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];