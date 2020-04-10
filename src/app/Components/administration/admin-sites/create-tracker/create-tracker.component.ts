import { Component, OnInit } from '@angular/core';
import { AssetService} from "../../../../Services/asset.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-tracker',
  templateUrl: './create-tracker.component.html',
  styleUrls: ['./create-tracker.component.css']
})
export class CreateTrackerComponent implements OnInit {

  serial_no:string = '';
  state:string="IDLE";
  make:string = '';
  model:string = '';
  type:string="TRACKER";

  constructor( private _assetService:AssetService,private router: Router) { }

  ngOnInit() {
  }
  /* Added by Akshay for form validation */
  isValid(){
    return (this.state == '' || this.make == '' || this.model == '' || this.type == '')
  }
  onSubmit(){

    let payload={
      deviceSerialNo : this.serial_no,
      deviceState : this.state,
      make : this.make,
      model: this.model,
      deviceType: this.type,
    }
    console.log(JSON.stringify(payload))
    this._assetService.createDevices(JSON.stringify(payload)).subscribe(res=>{
      this.router.navigate(['admin/sites/Trackers'])
    });
     
  }

  cancel(){
     this.router.navigate(['admin/sites/Trackers'])
  }

}
