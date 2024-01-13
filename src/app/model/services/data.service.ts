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
  
  // create and update data 
  createe(key:string ,action:string , product:any){
    if(action=="add-product"){
      this.http.post(`${environment.firebase.databaseURL}/${product.type}.json`,product).subscribe((data)=>{
        this.toastr.success("تم اضافة المنتج","عملية ناجحة"); 
      })
    }else{
      this.http.put(`${environment.firebase.databaseURL}/${product.type}/${key}.json`,product).subscribe((data)=>{
        this.toastr.warning("تم تعديل المنتج","عملية ناجحة"); 
      })
    }
  }

  // get data from API
  getDataAPI(type:string):Observable<product[]>{
    return this.http.get<product[]>(`${environment.firebase.databaseURL}/${type}.json`)
  }

  //  --------------- create and update data page top data ---------------
  createCarasouel(key:string , action:string ,type:string , data:any){
    if(action=="add-carasouel"){
      this.http.post(`${environment.firebase.databaseURL}/${type}.json`,data).subscribe((data)=>{
        this.toastr.success("تم اضافة الصورة","عملية ناجحة"); 
      })
    }else{
      this.http.put(`${environment.firebase.databaseURL}/${type}/${key}.json`,data).subscribe((data)=>{
        this.toastr.warning("تم تعديل الصورة","عملية ناجحة"); 
      })
    }
  }

  // delete data
  del(type:string,key:string){
    return this.http.delete(`${environment.firebase.databaseURL}/${type}/${key}.json`).subscribe((data)=>{
      this.toastr.success("تم حذف الصورة","عملية ناجحة"); 
    })
  }
}
