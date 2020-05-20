import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
    //,
 //   NgbModule.forRoot()
  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
