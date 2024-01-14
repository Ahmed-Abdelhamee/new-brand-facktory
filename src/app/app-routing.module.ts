import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { WomenComponent } from "./components/women/women.component";
import { KidsComponent } from "./components/kids/kids.component";
import { MenComponent } from "./components/men/men.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

const routes: Routes = [
    // {path:"",redirectTo:"/home",pathMatch:"full"},
    // {path:"",component:WomenComponent},
    {path:"home",component:HomeComponent},
    {path:"",component:MenComponent},
    {path:"women",component:WomenComponent},
    {path:"kids",component:KidsComponent},
    {path:"product/:id",component:ProductDetailsComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
    exports: [RouterModule]
})

  export class AppRoutingModule { }