import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  typeOfDataFromParent:string="";
  constructor(private route : Router){}

  setAcitve(link:string){
    $(`#basic`).removeClass("active")
    $(`#men`).removeClass("active")
    $(`#women`).removeClass("active")
    $(`#kids`).removeClass("active")
    $(`#${link}`).addClass("active")
  }

  logout(){
    sessionStorage.removeItem("Admin");
    this.route.navigate(["/"])
  }
}