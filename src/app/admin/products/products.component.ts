import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges} from '@angular/core';
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
export class ProductsComponent implements  OnChanges{
  // important arrays 
  photosPromo:any[]=[];
  photosFiles:File[]=[];
  photosSize:number[]=[];
  products:product[]=[];
  // adultLinks:string[]=["occasion","clothes","shoes","bags","accessiores","jewellary","whatches","homeWare"];
  // kidsLinks:string[]=["occasion","baby-0-36-monthes","kids-2-12","teenagers"]
  // variables for set a control
  numberOfImages!: number;  
  control:string="";
  globalProduct:product={} as product;
  globalKey:string="";
  productsFilter:any="";

  @Input() typeOfDataFromParent:string="";

  // product input
  product=this.formBuilder.group({
    id:[new Date().getTime(),],
    type:["",Validators.required],
    department:["",Validators.required],
    title:["",Validators.required],
    details:["",Validators.required],
    prePrice:[0,Validators.required],
    price:[0,Validators.required],
    size:[""],
    productImages:this.formBuilder.array([])
  })
  get images(){
    return this.product.get("productImages") as FormArray
  }

  constructor(private formBuilder:FormBuilder,private toastr:ToastrService , private dataServ:DataService , private firestorage:AngularFireStorage,private http:HttpClient){ }
  
  // to set the data depending on the choice from parent
  ngOnChanges() {
    this.products=[];
    this.photosPromo=[];
    this.dataServ.getDataAPI(this.typeOfDataFromParent).subscribe((data)=>{
      for (const key in data) {
        this.products.push(data[key])
      }
      this.products=this.products.filter(item => item.department == this.productsFilter )
    })
  }
  //empty product for adding 
  emptyProuct(){
    this.photosPromo=[]
    this.product.patchValue({
      id:0,
      type:"",
      department:"",
      title:"",
      details:"",
      prePrice:0,
      price:0,
    })
    this.emptyProductImages() // empty product images array
  }
 // empty product images for a new adding     or    editing peice of product 
  emptyProductImages(){
    for (let i in this.images) { // delete all the images
      this.images.removeAt(0);
    }
    this.photosPromo=[]
  }
  // empty department when type changes
  emptyDep(){
    this.product.patchValue({
      department:''
    })
  }

  // ------------------------------------------ uploading product ------------------------------------------
  // promo upload to show which files uploaded and the size of each photo
  upload(event:any){
    const files=event.target.files;
    this.photosSize=[];  // array for identify the big files
    this.photosPromo=[];
    this.photosFiles=[];
    for (let i=0;i < event.target.files.length ;i++) {
      let loader=new FileReader();
      if(event.target.files[i].size/1024 > 30)
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
    console.log(this.images.value)
    console.log(this.photosFiles.length)
    this.toastr.info("يتم رفع  تفاصيل المنتج حاليا")
    for(let i=0; i < this.photosFiles.length ; i++){
      const path=`ecommerce/${new Date().getTime()}${this.photosFiles[i].name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,this.photosFiles[i])
      const url =await uploadTask.ref.getDownloadURL().then()
      // create a form-group to save image link in it --- and push the image in the array of upoaded images
        let uploadImage=this.formBuilder.group({
          img:url
        })
      this.images.push(uploadImage) // form array - only push a FormGroup object 
    }
    this.photosFiles=[]
  }
  
  // ------------------------------------------ add product ------------------------------------------
  // --------- sending the data to firebase backend ---------
  submit() {
    if ((this.product.get("prePrice")?.value! > this.product.get("price")?.value! || this.product.get("department")?.value! !="occasion") &&
       this.product.get("price")?.value! > 0 && this.product.get("type")?.value != '' &&
       this.product.get("department")?.value != '' && this.product.get("title")?.value != '' &&
       this.product.get("details")?.value != '' && this.photosPromo.length > 1) {

      if (this.control == "add-product") {
        this.product.patchValue({
          id: new Date().getTime(),
        })
        this.activeUpload().then(() => {
          this.dataServ.createe('', "add-product", this.product.value)
          this.emptyProuct();
        })
      }// --------- for editing the products ---------
      else if (this.control == "edit-product") {
        // if there are a new uploads 
        if (this.photosFiles.length != 0) {
          this.emptyProductImages()
          this.activeUpload().then(() => {
            this.dataServ.createe(this.globalKey, "edit-product", this.product.value)
            this.emptyProuct();
          })
          this.deleteImagesFromFireStorage()
          // if there is no any new uploads
        } else {
          this.dataServ.createe(this.globalKey, "edit-product", this.product.value)
          this.emptyProuct();
        }
      }
    } else {
      this.toastr.error("راجع بيانات المنتج")
    }
  }

// ------------------------------------------ edit product ------------------------------------------
  edit(item:product){
    this.photosPromo=[];
    this.emptyProductImages(); // empty product images array
    this.product.patchValue({
      id:item.id,
      type:item.type,
      department:item.department,
      title:item.title,
      details:item.details,
      prePrice:item.prePrice,
      price:item.price,
    })
    // for showing it on form and set the photos 
    for (const temp of item.productImages){
      let uploadImage=this.formBuilder.group({
       img:temp.img
      })
      this.images.push(uploadImage)
      this.photosPromo.push(temp.img) // for showing it on the form
    }
    this.getItem(item)
  }

// ------------------------------------------ delete product ------------------------------------------
  getItem(item:product){
    this.globalProduct=item;
    this.dataServ.getDataAPI(this.globalProduct.type).subscribe(data =>{
      for (const key in data) {
        if(this.globalProduct.id==data[key].id){
          this.globalKey=key;
          break;
        }
      }
    })
  }
  // for the active delete from database server
  deleteProd(){
    this.toastr.info("يتم حذف المنتج حاليا")
    /* this variable for identify which data will be edit */
    this.http.delete(`${environment.firebase.databaseURL}/${this.globalProduct.type}/${this.globalKey}.json`).subscribe((data) => {
      this.toastr.success("تم حذف المنتج", "");
      this.ngOnChanges()
    })
    this.deleteImagesFromFireStorage()
  }
  deleteImagesFromFireStorage(){
    for (const temp in this.globalProduct.productImages) {
      this.firestorage.storage.refFromURL(this.globalProduct.productImages[temp].img).delete()
    }
  }
  // --------------------------------------------------------------------------------

}
