import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
   
  photourl:any[]=[];

  photosSize:number[]=[];

  control:string="data";

  adultLinks:string[]=["occasion","clothes","shoes","bags","accessiores","jewellary","whatches","homeWare"];

  kidsLinks:string[]=["occasion","baby-0-36-monthes","kids-2-12","teenagers"]

  constructor(private formBuilder:FormBuilder){}

  product=this.formBuilder.group({
    id:[new Date().getTime(),],
    type:[""],
    department:[""],
    title:[""],
    details:[""],
    prePrice:[""],
    price:[""],
    img:this.formBuilder.array([])
  })

  ngOnInit(): void {
    
  }

  upload(event:any){
    const files=event.target.files;
    this.photosSize=[]
    for (let i=0;i<event.target.files.length;i++) {
      let loader=new FileReader();
      if(event.target.files[i].size/1024 > 50)
      this.photosSize.push(i+1)
      loader.readAsDataURL(event.target.files[i])
      loader.onload=(event)=>{
        this.photourl.push(event.target?.result);
      }
    }
  }

  submit(){
    console.log(this.product.value)
  }

}
