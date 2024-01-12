import { Component } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  getFavourites(){
    console.log(localStorage.getItem("department"))
      localStorage.setItem("department","kkk")
  }
}
