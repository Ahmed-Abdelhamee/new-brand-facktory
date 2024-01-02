import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { WomenComponent } from "./components/women/women.component";

const routes: Routes = [
    // {path:"",redirectTo:"/home",pathMatch:"full"},
    {path:"",component:WomenComponent},
    {path:"home",component:HomeComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
    exports: [RouterModule]
})

  export class AppRoutingModule { }