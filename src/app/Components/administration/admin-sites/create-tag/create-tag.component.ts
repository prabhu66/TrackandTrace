import { Component, OnInit } from '@angular/core';
import { AssetService} from "../../../../Services/asset.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {

  serial_no:string;
  state:string="IDLE";
  make:string = '';
  model:string = '';
  type:string="BLE";

  constructor(private _assetService:AssetService,private router: Router) { }

  ngOnInit() {
  }
  /* Added by Akshay for form validation */
  isValid(){
    return (this.state == '' || this.make == '' || this.model == '' || this.type == '' || this.serial_no == '')
  }
  onSubmit(){
    let payload={
      deviceSerialNo : this.serial_no,
      deviceState : this.state,
      make : this.make,
      model: this.model,
      deviceType: this.type,
    }
    this._assetService.createDevices(JSON.stringify(payload)).subscribe(res=>{
      this.router.navigate(['admin/sites/Tags'])
    });
     

  }
  cancel(){
     this.router.navigate(['admin/sites/Tags'])
  }

}
