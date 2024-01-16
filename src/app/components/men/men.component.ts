import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { carasouel } from 'src/app/model/interfaces/carasouel.interface';
import { textContent } from 'src/app/model/interfaces/textContent.interface';


@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss',"../../model/css-styles/user-css.css"]
})
export class MenComponent implements OnInit {

  allproducts:product[]=[]
  products:product[]=[];
  carasouels:carasouel[]=[]
  textContent:textContent={} as textContent;
  favouriteproducts:product[]=[]
  
  constructor(private dataServ:DataService,private route:Router){
    // get products
    dataServ.getDataAPI("men").subscribe((data)=>{
      for (const key in data) {
        this.allproducts.push(data[key])
      }
      this.products=this.allproducts.filter(item => item.department =="occasion").reverse();
      this.setLinkActive("occasion")
    })
    // get carasouel 
    dataServ.getpagesCarasouelAPI("carasouel").subscribe(data=>{
      for (const key in data) {
        if(data[key].type=="men")
        this.carasouels.push(data[key])
      }
    })
    // get text content 
    dataServ.getpagesContentAPI("pagesTitles").subscribe(data=>{
      for (const key in data) {
        this.textContent=(data[key]);
      }
    })
  }

  ngOnInit(): void {
    
  }

  filter(part:string){
    this.products=this.allproducts.filter(item => item.department == part).reverse()
    this.setLinkActive(part)
  }

  setLinkActive(part:string){
    $(`#occasion`).removeClass("text-danger")
    $(`#clothes`).removeClass("text-danger")
    $(`#shoes`).removeClass("text-danger")
    $(`#bags`).removeClass("text-danger")
    $(`#accessiores`).removeClass("text-danger")
    $(`#jewellary`).removeClass("text-danger")
    $(`#whatches`).removeClass("text-danger")
    $(`#homeWare`).removeClass("text-danger")

    $(`#${part}`).addClass("text-danger")
  }
  
  setFavourites(item:product){
    this.favouriteproducts=(JSON.parse(localStorage.getItem("favo-items-brand-store")!));
      this.favouriteproducts.push(item);
      localStorage.setItem("favo-items-brand-store",JSON.stringify(this.favouriteproducts))
  }

  productDetails(item:product){
    this.route.navigate([`/product/${item.type}-${item.id}`])
  }

  isFavourite(id:number):boolean{
    let founded=false;
    this.favouriteproducts=(JSON.parse(localStorage.getItem("favo-items-brand-store")!));
    for(let i in this.favouriteproducts)
     if(id==this.favouriteproducts[i].id)
     founded = true;
    return founded;
    // return false;
  }
}
