import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { InputFormComponent } from './input-form/input-form.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsVizComponent } from './students-viz/students-viz.component';
import { PrivilegeLevelGuard } from './guards/privilege-level.guard';
import { PortalGuard } from './guards/portal.guard';
import { PrivilegeLevel as PL } from './services/user-data.model';


const routes: Routes = [
  {
    path: '', component: PortalComponent,
    canActivate: [PortalGuard], data: {
      Guest: '/login',
      Student: '/form',
      Operator: '/stats',
      Admin: '/stats'
    }
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [PrivilegeLevelGuard],
    data: {level: [PL.Guest, PL.Admin]}
  },
  {
    path: 'form', component: InputFormComponent,
    canActivate: [PrivilegeLevelGuard],
    data: {level: [PL.Student, PL.Admin]}
  },
  {
    path: 'students', component: StudentsListComponent,
    canActivate: [PrivilegeLevelGuard],
    data: {level: [PL.Operator, PL.Admin]}
  },
  {
    path: 'stats', component: StudentsVizComponent,
    canActivate: [PrivilegeLevelGuard],
    data: {level: [PL.Operator, PL.Admin]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
