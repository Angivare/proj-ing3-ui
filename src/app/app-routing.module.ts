import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { InputFormComponent } from './input-form/input-form.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsVizComponent } from './students-viz/students-viz.component';
import { GuestGuard } from './guards/guest.guard';
import { StudentGuard } from './guards/student.guard';
import { OperatorGuard } from './guards/operator.guard';
import { PortalGuard } from './guards/guards/portal.guard';


const routes: Routes = [
  {path: '', component: PortalComponent, canActivate: [PortalGuard]},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'form', component: InputFormComponent, canActivate: [StudentGuard]},
  {path: 'students', component: StudentsListComponent, canActivate: [OperatorGuard]},
  {path: 'stats', component: StudentsVizComponent, canActivate: [OperatorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
