import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce2';

  showHeader:boolean=true;
  constructor(private route:Router){
    route.events.subscribe(val=>{
      if(val instanceof NavigationEnd){
        if(val.url.split("/").includes('admin') || val.url.endsWith("admin") || val.url.endsWith("admin-login-dash")){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
    // if(route.){

    // }
  }

}
