import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetService } from "../../../../Services/asset.service";


@Component({
  selector: 'app-edit-devices',
  templateUrl: './edit-devices.component.html',
  styleUrls: ['./edit-devices.component.css']
})
export class EditDevicesComponent implements OnInit {
  id: any;
  device: any = {};
  is_edit1: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public _assetService: AssetService) { }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });
    if (this._assetService.device == "Tag") {
      this._assetService.GetTaglist().subscribe(res => {
        /* Akshay modification using 3rd variable instead of res.data */
        let x = res.data;
        for (let i = 0; i < x.length; i++) {
          if (x[i].ID == this.id) {
            this.device = x[i];
            break;
          }
        }
      })
    }
    if (this._assetService.device == "Tracker") {
      this._assetService.GetTrackerList().subscribe(res => {
        /* Akshay modification using 3rd variable instead of res.data */
        let x=res.data;
        for(let i=0;i<x.length;i++){
           if(x[i].ID ==this.id){
              this.device=x[i];
              break;
           }
        }
       /*  for (let i = 0; i < res.body.length; i++) {
          if (res.body[i].ID == this.id) {
            this.device = res.body[i];
            break;
          }
        } */
      })
    }
    if (this._assetService.device == "Gateway") {
      /* GATEWAYSERIALNO: "SlN12e"
GATEWAYSTATE: "IDLE"
GATEWAYTYPE: "BLE"
ID: 27
MAKE: "Mak123"
MODEL: "Model1234" */
/* gatewaySerialNo
gatewayState
make
model
gatewayType */
      this._assetService.GetGatewayList().subscribe(res => {
        /* Akshay modification using 3rd variable instead of res.data */
        let x=res.data;
        for(let i=0;i<x.length;i++){
           if(x[i].ID ==this.id){
             /* Modified by Akshay for gateway edit */
             this.device['DeviceSerialNo'] = x[i].GATEWAYSERIALNO;
             this.device['DeviceState'] = x[i].GATEWAYSTATE;
             this.device['Make'] = x[i].MAKE;
             this.device['Model'] = x[i].MODEL;
             this.device['DeviceType'] = x[i].GATEWAYTYPE;
             this.device['ID'] = x[i].ID;
              break;
           }
        }
        /* for (let i = 0; i < res.body.length; i++) {
          if (res.body[i].ID == this.id) {
            this.device = res.body[i];
            break;
          }
        } */
      })
    }

  }
/* Added by Akshay for form validation */
isValid(){
  return (this.device.DeviceSerialNo == '' || this.device.DeviceState == '' || this.device.Make == '' || this.device.Model == '' || this.device.DeviceType == '')
}
  onSubmit(formValue: any) {
    let payload;
    if (this._assetService.device == 'Gateway') {
      payload = {
        ID: this.device.ID,
        gatewaySerialNo: formValue.serialno,
        gatewayState: formValue.state,
        make: formValue.make,
        model: formValue.model,
        gatewayType: formValue.type
      }
    } else {
      payload = {
        ID: this.device.ID,
        deviceSerialNo: formValue.serialno,
        deviceState: formValue.state,
        make: formValue.make,
        model: formValue.model,
        //akshay modification
        deviceType: formValue.type,
        //deviceType: this.device.DeviceType,
      }
    }
    payload = {
      ID: this.device.ID,
      deviceSerialNo: formValue.serialno,
      deviceState: formValue.state,
      make: formValue.make,
      model: formValue.model,
      //akshay modification
      deviceType: formValue.type,
      //deviceType: this.device.DeviceType,
    }
    console.log(JSON.stringify(payload))
    this._assetService.EditDevice((payload)).subscribe(res => {
      console.log(res);
      if (this._assetService.device == "Tag") {
        this.router.navigate(['admin/sites/Tags'])
      }
      if (this._assetService.device == "Tracker") {
        this.router.navigate(['admin/sites/Trackers'])
      }
      if (this._assetService.device == "Gateway") {
        this.router.navigate(['admin/sites/Gateways'])
      }
    });

  }

  cancel() {

    if (this._assetService.device == "Tag") {
      this.router.navigate(['admin/sites/Tags'])
    }
    if (this._assetService.device == "Tracker") {
      this.router.navigate(['admin/sites/Trackers'])
    }
  }
}
