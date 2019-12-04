import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsVizComponent } from './students-viz/students-viz.component';
import { NavigationComponent } from './navigation/navigation.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    LoginComponent,
    PortalComponent,
    StudentsListComponent,
    StudentsVizComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
