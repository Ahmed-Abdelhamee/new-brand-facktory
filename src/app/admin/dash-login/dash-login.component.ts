import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/model/services/admin-auth.service';

@Component({
  selector: 'app-dash-login',
  templateUrl: './dash-login.component.html',
  styleUrls: ['./dash-login.component.scss']
})
export class DashLoginComponent {

  error:boolean=false;

  constructor(private fb:FormBuilder ,private route:Router,private auth:AdminAuthService) { }

  login=this.fb.group({
    email:["",Validators.required],
    pass:["",Validators.required],
  })

  ngOnInit(): void {
  }

  submit(){
    this.auth.login(this.login.value).catch(()=>{
      sessionStorage.setItem("Admin","is False not Admin")
      this.error=true;
    });
  }
}
