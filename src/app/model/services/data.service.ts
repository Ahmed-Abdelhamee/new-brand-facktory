import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient , private toastr : ToastrService ) { }
  
  createe(key:string ,action:string , product:any){
    if(action=="add-product"){
      this.http.post(`${environment.firebase.databaseURL}/${product.type}.json`,product).subscribe((data)=>{
        this.toastr.success("تم اضافة المنتج","عملية ناجحة"); 
      })
    }else{
      console.log(product)
      this.http.put(`${environment.firebase.databaseURL}/${product.type}/${key}.json`,product).subscribe((data)=>{
        this.toastr.warning("تم تعديل المنتج","عملية ناجحة"); 
      })
    }
   
  }

  getDataAPI(type:string):Observable<product[]>{
    return this.http.get<product[]>(`${environment.firebase.databaseURL}/${type}.json`)
   }
}
