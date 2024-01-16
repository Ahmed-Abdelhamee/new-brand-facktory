import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { product } from 'src/app/model/interfaces/product.interface';
import { social } from 'src/app/model/interfaces/social.interface';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  favouriteproducts:product[]=[]

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

  ngOnInit(){
    this.favouriteproducts=(JSON.parse(localStorage.getItem("favo-items-brand-store")!));
    console.log(localStorage.getItem("favo-items-brand-store")?.split)
  }

  showFavourit(){
    this.favouriteproducts=(JSON.parse(localStorage.getItem("favo-items-brand-store")!));
  }

  del(itemIndex:number){
    this.favouriteproducts.splice(itemIndex,1);
    localStorage.setItem("favo-items-brand-store",JSON.stringify(this.favouriteproducts))
  }
}
