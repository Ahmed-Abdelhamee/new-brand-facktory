import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { KidsComponent } from './components/kids/kids.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MenComponent,
    WomenComponent,
    KidsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // write this special code for upload img 
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide : LocationStrategy,useClass:HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
