import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/model/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { carasouel } from 'src/app/model/interfaces/carasouel.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', "../products/products.component.scss"]
})

export class HomePageComponent {

  @Input() typeOfDataFromParent: string = "";
  photoPromo: string = "";
  photoFile: any = "";
  control = "";
  type_of_data_in_part: string = "";  // to identify the acting between carasouel & content
  datalist: any[] = []; // to show data 
  photoSize: boolean = true; // to check photo Size
  globalObject: carasouel={} as carasouel;
  updateKey: string = ""

  constructor(private dataServ: DataService, private formBuilder: FormBuilder, private firestorage: AngularFireStorage, private toastr: ToastrService, private http:HttpClient) {
    // get titles & paragraphs in the front of pages 
    // dataServ.getpagesContentAPI("pagesTitles").subscribe(data=>{
    //   for (const key in data) {
    //     this.pagesTitle.patchValue({
    //       id: data[key].id,
    //       menTitle: data[key].menTitle,
    //       menparagraph: data[key].menparagraph,
    //       womenTitle: data[key].womenTitle,
    //       womenparagraph: data[key].womenparagraph,
    //       kidsTitle: data[key].kidsTitle,
    //       kidsparagraph: data[key].kidsparagraph,
    //     })
    //   }
    // })
   }

  addingHomeCarasouel = this.formBuilder.group({
    id: [new Date().getTime()],
    type: ["", Validators.required],
    img: [""]
  })
  // titles & paragraphs in the front of pages 
  // pagesTitle = this.formBuilder.group({
  //   id: [new Date().getTime()],
  //   menTitle: ["", Validators.required],
  //   menparagraph: ["" , Validators.required],
  //   womenTitle: ["", Validators.required],
  //   womenparagraph: ["" , Validators.required],
  //   kidsTitle: ["", Validators.required],
  //   kidsparagraph: ["" , Validators.required],
  // })

  whatsapp=this.formBuilder.group({
    id:["phone"],
    social:[""],
  })

  instagram=this.formBuilder.group({
    id:["instagram"],
    social:[""],
  })

  snapchat=this.formBuilder.group({
    id:["snapchat"],
    social:[""],
  })

  // -------------- promo upload --------------
  upload(event: any) {
    this.photoFile = event.target.files[0];
    this.photoSize = (event.target.files[0].size / 1024 > 100) ? false : true; // check size of photo
    let loader = new FileReader();
    loader.readAsDataURL(event.target.files[0])
    loader.onload = (event) => {
      this.photoPromo = event.target?.result?.toString()!;  // show the photos before uploading
    }
  }
  // -------------- funcion to upload img file and get image url ---- for About Product --------------
  async uploadCarasoul(file: any) {
    if (file) {
      const path = `ecommerce/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      this.photoFile = url;
    }
    this.addingHomeCarasouel.patchValue({
      img: this.photoFile
    })
  }
  // ------------------------------------------ add and edit carasouel ------------------------------------------
  // --------- sending the data to firebase backend ---------
  submit() {
    if (this.addingHomeCarasouel.valid && this.photoPromo != '') {
      if (this.control == "add-carasouel") {
        this.uploadCarasoul(this.photoFile).then(() => {
          this.addingHomeCarasouel.patchValue({
            id: new Date().getTime(),
            img: this.photoFile
          })
          this.dataServ.createCarasouel('', "add-carasouel", "carasouel", this.addingHomeCarasouel.value)
          this.photoPromo = ""
        })
      } else {
        if (this.photoPromo != this.globalObject.img) {
          this.uploadCarasoul(this.photoFile).then(() => {
            this.dataServ.createCarasouel(this.updateKey, "edit-carasouel", "carasouel", this.addingHomeCarasouel.value)
            this.firestorage.storage.refFromURL(this.globalObject.img).delete() // to remove all the images which are being stored in the firebase storage
          })
        } else {
          this.dataServ.createCarasouel(this.updateKey, "edit-carasouel", "carasouel", this.addingHomeCarasouel.value)
        }
        this.photoPromo = ""
      }
    } else {
      this.toastr.error("راجع البيانات  من فضلك ");
    }
  }
  // ------------------------------------------ show data carasouel ------------------------------------------
  showdata() {
    this.datalist = []
      this.dataServ.getDataAPI("carasouel").subscribe(data => {
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
  }

  // ----------------------------- find Item -----------------------------
  findItem(item: any) {
    this.globalObject = item;
    this.photoPromo = item.img;
    this.addingHomeCarasouel.patchValue({
      img: item.img,
      type: item.type,
      id: item.id,
    })
    this.dataServ.getDataAPI("carasouel").subscribe(data => {
      for (const key in data) {
        if (data[key].id == item.id) {
          this.updateKey = key;
          break;
        }
      }
    })
  }
  // ----------------------------- delete Item  -----------------------------
  del(item:carasouel){
    this.dataServ.getDataAPI("carasouel").subscribe(data => {
      for (const key in data) {
        if (data[key].id == item.id) {
          this.http.delete(`${environment.firebase.databaseURL}/carasouel/${key}.json`).subscribe(()=>{
            this.toastr.success("تم حذف الصورة","عملية ناجحة"); 
            this.showdata()
          })
          this.firestorage.storage.refFromURL(item.img).delete() // to remove all the images which are being stored in the firebase storage
          break;
        }
      }
    })
  }

  // ------------ update pages content -------------
  // updateData(){
  //   this.dataServ.updatePagesTitle(this.pagesTitle.value)
  // }
  
  //------------------------------------ update what's app ------------------------------------
  submitWhats(){
    this.dataServ.updateWhatsapp(this.whatsapp.value)
  }
  submitInstagram(){
    this.dataServ.updateInstagram(this.instagram.value)
  }
  submitSnapChat(){
    this.dataServ.updateSnapChat(this.snapchat.value)
  }

}
