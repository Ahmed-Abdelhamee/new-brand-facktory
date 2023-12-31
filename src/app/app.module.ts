import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ZfooterComponent } from './components/zfooter/zfooter.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { BagsComponent } from './components/bags/bags.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { JewelleryComponent } from './components/jewellery/jewellery.component';
import { NewComponent } from './components/new/new.component';
import { SaleComponent } from './components/sale/sale.component';
import { ShoesComponent } from './components/shoes/shoes.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZfooterComponent,
    HomeComponent,
    SaleComponent,
    NewComponent,
    BrandsComponent,
    ClothingComponent,
    ShoesComponent,
    BagsComponent,
    AccessoiresComponent,
    JewelleryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
