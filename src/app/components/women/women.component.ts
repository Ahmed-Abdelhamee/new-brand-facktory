import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss',"../../model/css-styles/user-css.css"]
})
export class WomenComponent implements OnInit {

  allproducts:product[]=[]
  products:product[]=[]
  
  constructor(private dataServ:DataService, private route:Router){}

  ngOnInit(): void {
    this.dataServ.getDataAPI("women").subscribe((data)=>{
      for (const key in data) {
        this.allproducts.push(data[key])
      }
      this.products=this.allproducts.filter(item => item.department =="occasion").reverse()
    })
    this.setLinkActive("occasion")
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
    localStorage.setItem("department",item.department)
  }
  
  productDetails(item:product){
    this.route.navigate([`/product/${item.type}-${item.id}`])
  }
}
