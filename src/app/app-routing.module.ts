import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AccessoiresComponent } from "./components/accessoires/accessoires.component";
import { BagsComponent } from "./components/bags/bags.component";
import { BrandsComponent } from "./components/brands/brands.component";
import { JewelleryComponent } from "./components/jewellery/jewellery.component";
import { NewComponent } from "./components/new/new.component";
import { SaleComponent } from "./components/sale/sale.component";
import { ShoesComponent } from "./components/shoes/shoes.component";

const routes: Routes = [
    {path:"",redirectTo:"/home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"accessories",component:AccessoiresComponent},
    {path:"bags",component: BagsComponent},
    {path:"brands",component:BrandsComponent},
    {path:"jewellery",component:JewelleryComponent},
    {path:"news",component:NewComponent},
    {path:"sale",component:SaleComponent},
    {path:"shoes",component:ShoesComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
    exports: [RouterModule]
})

  export class AppRoutingModule { }