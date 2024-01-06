import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/model/interfaces/product.interface';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnChanges{
  
  photosPromo:any[]=[];
  photosFiles:File[]=[];
  photosSize:number[]=[];
  products:product[]=[]
  adultLinks:string[]=["occasion","clothes","shoes","bags","accessiores","jewellary","whatches","homeWare"];
  kidsLinks:string[]=["occasion","baby-0-36-monthes","kids-2-12","teenagers"]
  
  numberOfImages!: number;  
  control:string="add-product";
  uploadingCheck:string="";
  numberOfPhotos:number=0;

  @Input() typeOfDataFromParent:string=""
  
  constructor(private formBuilder:FormBuilder,private toastr:ToastrService , private dataServ:DataService , private firestorage:AngularFireStorage){ }

  ngOnChanges() {
    this.products=[]
    this.dataServ.getDataAPI(this.typeOfDataFromParent).subscribe((data)=>{
      for (const key in data) {
        this.products.push(data[key])
      }
    })
  }

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

  /// uploading file products on firebase 
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
  /// uploading file products on firebase 
  submit(){
    this.uploadingCheck="uploadingImage";
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

}
