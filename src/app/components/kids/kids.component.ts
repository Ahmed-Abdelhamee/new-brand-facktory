import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss',"../../model/css-styles/user-css.css"]
})
export class KidsComponent implements OnInit {

  allproducts:product[]=[]
  products:product[]=[]
  
  constructor(private dataServ:DataService){}

  ngOnInit(): void {
    this.dataServ.getDataAPI("kids").subscribe((data)=>{
      for (const key in data) {
        this.allproducts.push(data[key])
      }
      this.products=this.allproducts.filter(item => item.department =="occasion").reverse()
    })
  }

  filter(part:string){
    this.products=this.allproducts.filter(item => item.department == part).reverse()
  }
}
