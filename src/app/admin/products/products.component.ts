import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnChanges{
  // important arrays 
  photosPromo:any[]=[];
  photosFiles:File[]=[];
  photosSize:number[]=[];
  products:product[]=[]
  adultLinks:string[]=["occasion","clothes","shoes","bags","accessiores","jewellary","whatches","homeWare"];
  kidsLinks:string[]=["occasion","baby-0-36-monthes","kids-2-12","teenagers"]
  // variables for set a control
  numberOfImages!: number;  
  control:string="add-product";
  numberOfPhotos:number=0;
  globalProduct!:product;
  globalKey:string=""

  @Input() typeOfDataFromParent:string=""
  
  constructor(private formBuilder:FormBuilder,private toastr:ToastrService , private dataServ:DataService , private firestorage:AngularFireStorage,private http:HttpClient){ }
  // to set the data depending on the choice from parent
  ngOnChanges() {
    this.products=[]
    this.dataServ.getDataAPI(this.typeOfDataFromParent).subscribe((data)=>{
      for (const key in data) {
        this.products.push(data[key])
      }
      this.products.filter(item => item.department == "occasion")
    })
  }
  // product input
  product=this.formBuilder.group({
    id:[new Date().getTime(),],
    type:["",Validators.required],
    department:["",Validators.required],
    title:["",Validators.required],
    details:["",Validators.required],
    prePrice:[0,Validators.required],
    price:[0,Validators.required],
    productImages:this.formBuilder.array([])
  })

  get images(){
    return this.product.get("productImages") as FormArray
  }

  ngOnInit(): void {
    
  }
  // promo upload to show which files uploaded and the size of each photo
  upload(event:any){
    const files=event.target.files;
    this.photosSize=[];  // array for identify the big files
    this.photosPromo=[];
    this.photosFiles=[];
    this.numberOfPhotos = event.target.files.length;
    for (let i=0;i < event.target.files.length ;i++) {
      let loader=new FileReader();
      if(event.target.files[i].size/1024 > 50)
      this.photosSize.push(i+1)
      loader.readAsDataURL(event.target.files[i])
      this.photosFiles.push(event.target.files[i]) // adding file in the array
      loader.onload=(event)=>{
        this.photosPromo.push(event.target?.result);  // show the photos before uploading
      }
    }
  }

  /// uploading files & products on firebase 
  async activeUpload(){
    this.toastr.info("يتم رفع  تفاصيل المنتج حاليا")
    for(let i=0; i < this.photosFiles.length ; i++){
      const path=`ecommerce/${new Date().getTime()}${this.photosFiles[i].name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,this.photosFiles[i])
      const url =await uploadTask.ref.getDownloadURL()
      // create a form-group to save image link in it --- and push the image in the array of upoaded images
        let uploadImage=this.formBuilder.group({
          img:url
        })
        this.images.push(uploadImage) // form array - only push a FormGroup object 
    }
  }
  /// sending the data to firebase backend 
  submit(){
    if( (this.product.get("prePrice")?.value!>this.product.get("price")?.value! || this.product.get("prePrice")?.value! <=0 ) &&
         this.product.get("price")?.value! >0 &&
         this.product.get("type")?.value!='' &&
         this.product.get("department")?.value!='' &&
         this.product.get("title")?.value!='' &&
         this.product.get("details")?.value!='' &&
         this.photosFiles.length!=0 ) {
          this.activeUpload().then(()=>{
            this.dataServ.createe(this.product.value)
          }).catch(()=>{
            this.toastr.error("حدث خطاء")
          })
    }else {
      this.toastr.error("راجع بيانات المنتج")
    }
  }

   del(item:product){
    this.globalProduct=item;
    this.dataServ.getDataAPI(item.type).subscribe(data =>{
      for (const key in data) {
        if(item.id==data[key].id){
          // this.keyForDeleteOrEdit=key;
          this.http.delete(`${environment.firebase.databaseURL}/${item.type}/${key}.json`).subscribe((data)=>{
            this.toastr.success("تم حذف المنتج","");
            this.ngOnChanges()            
          })
          for (const temp in item.productImages) {
            this.firestorage.storage.refFromURL(item.productImages[temp].img).delete()
          }
          break;
        }
      }
    })
  }

  // // -------------- delete product --------------
  // del(item:product){
  //   /* this variable for identify which data will be edit */ let checkBasicPage=item.selectedPage! == "basic-page"? `${item.selectedPage!}-${item.basicPagePart!}`:`${item.selectedPage!}`;
  //       this.dataServ.getDataAPI(checkBasicPage).subscribe(data =>{
  //         for (const key in data) {
  //           if(item.id==data[key].id){
  //             this.keyForDeleteOrEdit=key;
  //             this.http.delete(`${environment.firebase.databaseURL}/${checkBasicPage}/${key}.json`).subscribe((data)=>{
  //               this.toastr.success("تم حذف المنتج","");
  //               this.ngOnChanges()            
  //             })
  //             this.firestorage.storage.refFromURL(this.deleteProduct.photoUrl!).delete()
  //             break;
  //           }
  //         }
  //       })
  //     }

}
