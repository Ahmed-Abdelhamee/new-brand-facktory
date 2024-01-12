import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss',"../../model/css-styles/user-css.css"]
})
export class KidsComponent implements OnInit {

  allproducts:product[]=[]
  products:product[]=[]
  
  constructor(private dataServ:DataService, private route:Router){}

  ngOnInit(): void {
    this.dataServ.getDataAPI("kids").subscribe((data)=>{
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
