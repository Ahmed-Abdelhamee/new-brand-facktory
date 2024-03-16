import { Component, OnDestroy, OnInit } from '@angular/core';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { carasouel } from 'src/app/model/interfaces/carasouel.interface';
import { textContent } from 'src/app/model/interfaces/textContent.interface';
import { searchWords } from 'src/app/model/interfaces/search.products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss', "../../model/css-styles/user-css.css"]
})
export class KidsComponent implements OnInit ,OnDestroy {
  subscribtions:Subscription[]=[]
  allproducts: product[] = []
  products: product[] = []
  searches:product[]=[]
  carasouels: carasouel[] = []
  textContent: textContent = {} as textContent;
  favouriteproducts: product[] = []
  brands: string[] = [];
  // setTogglerWork: string = ""     // to remove the toggler hide event from disktop in =>   data-bs-target

  constructor(private dataServ: DataService, private route: Router) {
    if(sessionStorage.getItem("page-attitude")!="kids-page-working-fine"){
      sessionStorage.setItem("page-attitude","kids-page-working-fine")
      window.location.reload()
    }
    // basic stucture of observable with subscription // get products
    this.subscribtions.push(this.dataServ.getDataAPI("kids").subscribe({
      next:(data)=>{
        for (const key in data) {
          this.allproducts.push(data[key])
        }
      },
      error:()=>{console.log("error")},
      complete:()=>{ this.products = this.allproducts.filter(item => item.department == "clothes").reverse();
        for(let item of this.products){
          if(!this.brands.find(el=> el==item.brand))
            this.brands.push(item.brand)
        }
        this.brands.sort()
      }
    }))
    // get carasouel 
    this.subscribtions.push(dataServ.getpagesCarasouelAPI("carasouel").subscribe({
      next:(data) => {
        for (const key in data) {
          if (data[key].type == "kids")
            this.carasouels.push(data[key])
        }
      },
      error:()=>{console.log("error")},
      complete:()=>{},
    }))
    this.setLinkActive("clothes");
    // get text content  // removed by customer request
    // this.subscribtions.push(dataServ.getpagesContentAPI("pagesTitles").subscribe(
    //   data => {
    //     for (const key in data) {
    //       this.textContent = (data[key]);
    //     }
    //   })
    // )
    /*
    .subscribe({
        next:(data)=>{
          console.log(data)
        },
        error:()=>{console.log("error")},
        complete:()=>{console.log("ended")}
      })
    */
  }
  
  ngOnInit(): void { 
  }

  filter(part: string) {
    if (part == "occasion" || part == "clothes") {
      this.products = this.allproducts.filter(item => item.department == part).reverse()
    } else {
      this.products = this.allproducts.filter(item => item.brand == part).reverse();
      // if(window.innerWidth <=991)
      // this.setTogglerWork="#navbarSupportedContent"
    }
  }

  setLinkActive(part: string) {
    $(`#occasion-desktop`).removeClass("text-danger")
    $(`#clothes-desktop`).removeClass("text-danger")
    $(`#occasion-mobile`).removeClass("text-danger")
    $(`#clothes-mobile`).removeClass("text-danger")
    $(`#brand`).removeClass("text-danger")
    // removed by customer request
    // $(`#baby-0-36-monthes`).removeClass("text-danger")
    // $(`#kids-2-12`).removeClass("text-danger")
    // $(`#teenagers`).removeClass("text-danger")

    $(`#${part}`).addClass("text-danger")
  }

  productDetails(item: product) {
    this.route.navigate([`/product/${item.type}-${item.id}`])
  }

  setFavourites(item: product, index: number) {
    let productListedBefore = false
    for (let i = 0; i < this.favouriteproducts.length; i++) {
      if (this.favouriteproducts[i].id == item.id) {
        productListedBefore = true;
        index = i;
        break;
      }
    }
    if (productListedBefore) {
      this.favouriteproducts.splice(index, 1);
      localStorage.setItem("favo-items-brand-store", JSON.stringify(this.favouriteproducts));
    }
    else {
      this.favouriteproducts = JSON.parse(localStorage.getItem("favo-items-brand-store")!) ? JSON.parse(localStorage.getItem("favo-items-brand-store")!) : [];
      this.favouriteproducts.push(item);
      localStorage.setItem("favo-items-brand-store", JSON.stringify(this.favouriteproducts))
    }
  }

  isFavourite(id: number): boolean {
    let founded = false;
    this.favouriteproducts = JSON.parse(localStorage.getItem("favo-items-brand-store")!) ? JSON.parse(localStorage.getItem("favo-items-brand-store")!) : [];
    for (let i in this.favouriteproducts)
      if (id == this.favouriteproducts[i].id)
        founded = true;
    return founded;
  }

  search(fitch:string){
    this.searches=this.allproducts.filter(item=> item.title.includes(fitch) || item.brand.includes(fitch))
    if(fitch=="")
    this.searches=[]
  }
  
  emptySearches(){
    this.searches=[]
  }

  ngOnDestroy(): void {
    for(let subscribtion of this.subscribtions)
      subscribtion.unsubscribe()
  }

}
