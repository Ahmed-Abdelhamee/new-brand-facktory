import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { carasouel } from 'src/app/model/interfaces/carasouel.interface';
import { textContent } from 'src/app/model/interfaces/textContent.interface';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss',"../../model/css-styles/user-css.css"]
})
export class KidsComponent implements OnInit {

  allproducts:product[]=[]
  products:product[]=[]
  carasouels:carasouel[]=[]
  textContent!:textContent;
  
  constructor(private dataServ:DataService, private route:Router){
    // get products
    this.dataServ.getDataAPI("kids").subscribe((data)=>{
      for (const key in data) {
        this.allproducts.push(data[key])
      }
      this.products=this.allproducts.filter(item => item.department =="occasion").reverse()
    })
    // get carasouel 
    dataServ.getpagesCarasouelAPI("carasouel").subscribe(data=>{
      for (const key in data) {
        if(data[key].type=="kids")
        this.carasouels.push(data[key])
      }
    })
    // get text content 
    dataServ.getpagesContentAPI("pagesTitles").subscribe(data=>{
      for (const key in data) {
        this.textContent=(data[key]);
      }
    })
    this.setLinkActive("occasion")
  }

  ngOnInit(): void {
    
  }

  filter(part:string){
    this.products=this.allproducts.filter(item => item.department == part).reverse()
    this.setLinkActive(part)
  }

  setLinkActive(part:string){
    $(`#occasion`).removeClass("text-danger")
    $(`#baby-0-36-monthes`).removeClass("text-danger")
    $(`#kids-2-12`).removeClass("text-danger")
    $(`#teenagers`).removeClass("text-danger")

    $(`#${part}`).addClass("text-danger")
  }

  setFavourites(item:product){
    localStorage.setItem("department",item.department);
    localStorage.setItem("id",item.id.toString())
  }
  productDetails(item:product){
    this.route.navigate([`/product/${item.type}-${item.id}`])
  }
}
