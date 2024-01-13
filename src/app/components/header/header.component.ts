import { Component } from '@angular/core';
import * as $ from 'jquery'
import { social } from 'src/app/model/interfaces/social.interface';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  getFavourites(){
    console.log(localStorage.getItem("department"))
      localStorage.setItem("department","kkk")
  }

  // icons form dash 
  whatsapp:social[]=[]
  instagram:social[]=[]
  snapchat:social[]=[]

  constructor(private dataServ:DataService){
    // ----------------------- get whatsapp -----------------------
  this.whatsapp=dataServ.returnSoical("whatsapp");
  // ----------------------- get instagram -----------------------
  this.instagram=dataServ.returnSoical("insta");
  // ----------------------- get snapchat -----------------------
  this.snapchat=dataServ.returnSoical("snapchat");
  }
}
