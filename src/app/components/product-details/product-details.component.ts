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
  kidsSizeShoes:string[]=["25","26","27","28","29","30","31","32","33","34","35","36","37","38","39"]
  shoes:string[]=["37","38","39","40","41","42","43","44","45","other-size"]
  clothes:string[]=["Small","Medium","Large","X-Large","XX-Large","other-size"]
  size:any=""

  constructor( private router:ActivatedRoute, private dataServ:DataService, private route:Router){
    if(sessionStorage.getItem("page-attitude")!="product-details-page-working-fine"){
      sessionStorage.setItem("page-attitude","product-details-page-working-fine")
      window.location.reload()
    }
    route.events.subscribe(()=>{
      router.paramMap.subscribe(data=>
        this.getLinkData=data.get("id")?.toString().split("-")
      )
      dataServ.getDataAPI(this.getLinkData[0]).subscribe(data =>{
        for (const key in data) {
          if(data[key].id==this.getLinkData[1])
          this.product=data[key]
        }
      })
    })
    // ----------------------- get whatsapp -----------------------
      this.whatsapp=dataServ.returnSoical("whatsapp");
  }

  ngOnInit(): void {
    
  }

  moveLeft(){
   this.product.productImages.push(this.product.productImages.shift())
  }
  moveRight(){
    this.product.productImages.unshift(this.product.productImages.pop())
   }
 
}
