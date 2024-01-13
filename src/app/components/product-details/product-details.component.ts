import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/model/interfaces/product.interface';
import { social } from 'src/app/model/interfaces/social.interface';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss',"../../model/css-styles/user-css.css"]
})

export class ProductDetailsComponent implements OnInit {

  
  getLinkData:any="";
  whatsapp:social[]=[]
  product:product={} as product;

  constructor( private router:ActivatedRoute, private dataServ:DataService){
    router.paramMap.subscribe(data=>
      this.getLinkData=data.get("id")?.toString().split("-")
    )
    dataServ.getDataAPI(this.getLinkData[0]).subscribe(data =>{
      for (const key in data) {
        if(data[key].id==this.getLinkData[1])
        this.product=data[key]
      }
      console.log(this.product)
    })
    // ----------------------- get whatsapp -----------------------
      this.whatsapp=dataServ.returnSoical("whatsapp");
  }

  ngOnInit(): void {
    
  }

}
