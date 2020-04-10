import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/Services/asset.service';
import * as _ from 'lodash';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var jQuery: any;

@Component({
  selector: 'app-person-asset-management',
  templateUrl: './person-asset-management.component.html',
  styleUrls: ['./person-asset-management.component.css']
})
export class PersonAssetManagementComponent implements OnInit {

  public displayList;
  public displayLoader:boolean;
  public assetType = ['printer', 'laptop','monitor'];
  public select = false;
  public slideshow = false;
  public searchText = "";
  public assetDetails:any;
  monitor_params:string[]=["shock", "Temperature", "humidity"];
  array_of_param=new Array;

  showFilter: any;
  assetId: number; // For Release Asset
  assetUser: string; // For Release Asset
  assetName: string;
  assetSerialNo: string;
  category:string='People';

  // Modal varibales
    options: FormGroup;
    public Users;
    // public assetName;
    public userName;
    public enddate;
    public startdate;
    // public assetId;
  

highlightStatus: Array<boolean> = [];
  constructor( fb: FormBuilder,private _assetService: AssetService,private snackBar: MatSnackBar) {
    this.displayLoader=false; 
    this.getAssetInfo();
    this._assetService.GetSearchText.subscribe(search=>this.searchText=search);
    this._assetService.GetRefreshData.subscribe(list=>{
      //  console.log(list);
       this.displayList=list
       console.log(this.displayList);
       
       
    }
      );
    this.options = new FormGroup({
      startdate: new FormControl(),
      enddate: new FormControl()
   });
  }

  ngOnInit() {
    //  this._assetService.GetUsersList()
    // .subscribe(res=>{
    //   console.log(res.data)
    //   this.Users = res.data;
    // })
  }
  public addClass(i, asset){
    this.highlightStatus.fill(false);
    this.select  = true;
    // this.slideshow = true;
    this.highlightStatus[i]=!this.highlightStatus[i]
    this.assetDetails = asset;
    console.log('asset details', this.assetDetails)
    // this.displayList[i].highlight = 'highlight'
  }

  public getAssetInfo(){
    this._assetService.GetAllAssetList(this.category)
    .subscribe(res=>{
      _.forEach(res, asset=>{
          console.log('all people',res.data);
          this.displayList = res.data;
      })
    });
  }
  onSelect(value){
    console.log(value);
    this.array_of_param.push(value);
  }
  
public filterAssetType(type){
  this.searchText = '';
  this.closeModal();  
  if(type === 'All'){
  }
  else{
  this.displayList = _.filter(this.displayList, {'type':type});
  }
}
closeModal(){
  this.highlightStatus.fill(false);
  this.slideshow = false; 
  this.select = false
}
delete(i){
  this.array_of_param.splice(i,1);
}
DeleteAsset(asset,e){
  e.preventDefault();
  e.stopPropagation();
  var r = confirm("Delete Worker?");
  if (r == true) {
    console.log('deleteassetId', asset,asset.AssetID);
    const pay = {AssetID:asset.AssetID, assetSno:asset.AssetSerialNo}
    this._assetService.DeleteAsset(pay)
    .subscribe(res=>{
      console.log('res from delete asset', res.data);
      this.getAssetInfo();
    })
  }
}

AssociateAsset(asset,event){
  // event.preventDefault();
  // event.stopPropagation();
  // Code for Associating
  this.assetId=asset.AssetID;
  this.assetName=asset.AssetName;
}

setReleaseAssetId(assetId, assetUser, assetName, assetSerialNo) {
  this.assetId = assetId;
  this.assetUser = assetUser;
  this.assetName = assetName;
  this.assetSerialNo = assetSerialNo;
  console.log('RELEASE ASSET ID: ', this.assetId);
  console.log('RELEASE ASSET ID: ', this.assetUser);
}
ReleaseAsset() {
  // event.preventDefault();
  // event.stopPropagation();
  // Code for Releasing
  let releaseAssetObject = {
    AssetID: this.assetId,
    Status: 'Idle'
  };

  this._assetService.releaseAsset((releaseAssetObject))
  .subscribe(res => {
    console.log(res.status);
    if (res.status === 200) {

      // alert('Asset: ' + this.assetName + ' released Successfully');
      this.snackBar.open('Asset: ' + this.assetName + ' released Successfully', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
      this.getAssetInfo();
        }
  });
}

 SubmitData(){
    console.log(this.options.value)
    this.enddate = this.options.value.enddate.toISOString();
    this.startdate = this.options.value.startdate.toISOString();
  
  
    const payload ={
      AssetId: this.assetId,
      UserName: this.userName,
      StartTime: this.startdate ,
      EndTime:  this.enddate 
    }
    console.log(payload);
    this._assetService.AssociateAssetUser(payload)
   .subscribe(res=>{
    console.log(res);
  });

  // alert("Asset has been successfully associated");
  this.snackBar.open('Asset has been successfully associated', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
  this.getAssetInfo();
  jQuery('#associateUser').modal('hide');
  } 

  cancel(){
     jQuery('#associateUser').modal('hide');
  }
  RefreshPlan(){
    this.displayList=[];
    this.getAssetInfo();
  }
}

