import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  typeOfDataFromParent:string="basic-bage";

  setAcitve(link:string){
    $(`#men`).removeClass("active")
    $(`#women`).removeClass("active")
    $(`#kids`).removeClass("active")
    $(`#${link}`).addClass("active")
  }
}