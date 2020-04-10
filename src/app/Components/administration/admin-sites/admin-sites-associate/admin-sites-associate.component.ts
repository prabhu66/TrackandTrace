import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { AssetService  } from 'src/app/Services/asset.service'

@Component({
  selector: 'app-admin-sites-associate',
  templateUrl: './admin-sites-associate.component.html',
  styleUrls: ['./admin-sites-associate.component.css']
})
export class AdminSitesAssociateComponent implements OnInit {
  options: FormGroup;
  public Users;
  public assets;
  public category:string="Material";
  public object ={ startdate:'',
                  enddate:'',
                  user:'',
                  assetName:'',
                  AssetID:'' }
                  highLightAssets: Array<boolean> = [];
                  highLightUsers: Array<boolean> = [];
  constructor(fb: FormBuilder, private _assetservice:AssetService) { 
    this.options = new FormGroup({
      startdate: new FormControl(),
      enddate: new FormControl()
   });
    this.highLightAssets.fill(false);
    this.highLightUsers.fill(false);
    this._assetservice.GetUsersList()
    .subscribe(res=>{
      console.log(res)
      this.Users = res;
    })
    this._assetservice.GetAllAsset(this.category)
    .subscribe(res=>{
      console.log(res)
      this.assets = res.json();
    })
    // this.options = fb.group({
    //   // hideRequired: false,AssociateAssetUser
    //   // floatLabel: 'auto',
    // });
  }

  ngOnInit() {

  }
  SubmitData(){
    console.log(this.options.value)
    this.object.enddate = this.options.value.enddate.toISOString();
    this.object.startdate = this.options.value.startdate.toISOString();
    console.log(this.object);
    this.highLightAssets.fill(false);
    this.highLightUsers.fill(false);
    const payload ={
      AssetId: this.object.AssetID,
      UserName: this.object.user,
      StartTime: this.object.startdate ,
      EndTime:  this.object.enddate 
    }
    this._assetservice.AssociateAssetUser(payload)
  .subscribe(res=>{
    console.log(res);
  });
  }
  SelectUser(i, user) {
    console.log(i, user);
    this.highLightUsers.fill(false);
    this.highLightUsers[i] = !this.highLightUsers[i];
    this.object.user = user;
  }
  SelectAsset(j, asset) {
    console.log(j, asset);
    this.highLightAssets.fill(false);
    this.highLightAssets[j] = !this.highLightAssets[j];
    this.object.assetName = asset.AssetName;
    this.object.AssetID = asset.AssetID;
  }

}
