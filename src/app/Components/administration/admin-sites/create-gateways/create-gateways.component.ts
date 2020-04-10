import { Component, OnInit } from '@angular/core';
import { AssetService} from "../../../../Services/asset.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-gateways',
  templateUrl: './create-gateways.component.html',
  styleUrls: ['./create-gateways.component.css']
})
export class CreateGatewaysComponent implements OnInit {

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
    return (this.state == '' || this.make == '' || this.model == '' || this.type == '')
  }
  onSubmit(){
    let payload={
      gatewaySerialNo : this.serial_no,
      gatewayState : this.state,
      make : this.make,
      model: this.model,
      gatewayType: this.type,
    }
     console.log(JSON.stringify(payload))
    this._assetService.createGateway(JSON.stringify(payload)).subscribe(res=>{
      console.log(res);
      this.router.navigate(['admin/sites/Gateways'])
    });

  }
  cancel(){
     this.router.navigate(['admin/sites/Gateways'])
  }

}

