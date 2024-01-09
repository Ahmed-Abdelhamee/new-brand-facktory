import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss',"../../model/css-styles/user-css.css"]
})
export class WomenComponent implements OnInit {

  allproducts:product[]=[]
  products:product[]=[]
  
  constructor(private dataServ:DataService){}

  ngOnInit(): void {
    this.dataServ.getDataAPI("women").subscribe((data)=>{
      for (const key in data) {
        this.allproducts.push(data[key])
      }
      this.products=this.allproducts.filter(item => item.department =="occasion").reverse()
    })
  }
  price:number=10;
  price2:number=100;

  filter(part:string){
    this.products=this.allproducts.filter(item => item.department == part).reverse()
  }
}
