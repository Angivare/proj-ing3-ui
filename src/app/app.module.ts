import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsVizComponent } from './students-viz/students-viz.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    LoginComponent,
    PortalComponent,
    StudentsListComponent,
    StudentsVizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
