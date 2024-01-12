import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/model/services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss',"../products/products.component.scss"]
})

export class HomePageComponent {
  
  @Input() typeOfDataFromParent:string="";

  constructor( private dataServ:DataService, private formBuilder:FormBuilder){}

  addingHomeCarasouel=this.formBuilder.group({
    id:[new Date().getTime()],
    type:["",Validators.required],
    img:[""]
  })

}
