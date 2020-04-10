import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetService } from 'src/app/Services/asset.service';
import { Router} from '@angular/router';
import * as _ from 'lodash';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var jQuery: any;

@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.css']
})

export class AssetManagementComponent implements OnInit {
  public displayList;
  public displayLoader:boolean;
  public assetType = ['printer', 'laptop','monitor'];
  public select = false;
  public slideshow = false;
  public searchText;
  public assetDetails:any;
  public displayPeopleList;
  monitor_params:string[]=["shock", "Temperature", "humidity"];
  array_of_param=new Array;

  showFilter: any;
  assetId: number; // For Release Asset
  assetUser: string; // For Release Asset
  assetName: string;
  assetSerialNo: string;
  category:string='Material';

  // Modal varibales
    options: FormGroup;
    public Users;
    // public assetName;
    public userName;
    public enddate;
    public startdate;
    // public assetId;
    /* code for loader and modal Akshay */
  busy:boolean;
  selectedAsset:any;

highlightStatus: Array<boolean> = [];
  constructor( fb: FormBuilder,private _assetService: AssetService,private snackBar: MatSnackBar, private router:Router) {
    this.displayLoader=false; 
    this.getAssetInfo();
    this.options = new FormGroup({
      startdate: new FormControl(),
      enddate: new FormControl()
   });
  }
  @ViewChild('closedelModal') closedelModal;
  ngOnInit() {
    this.selectedAsset='';
     this._assetService.GetUsersList()
    .subscribe(res=>{
      console.log(res)
      this.Users = res.data;
    })
    
  }
  public addClass(i, asset){
    this.highlightStatus.fill(false);
    this.select  = true;
    // this.slideshow = true;
    this.highlightStatus[i]=!this.highlightStatus[i]
    this.assetDetails = asset;
    this._assetService.editAsset=asset;
    console.log('asset details', this.assetDetails)
    console.log(asset);
    // this.displayList[i].highlight = 'highlight'
  }

 
  public getAssetInfo(){
    this._assetService.GetAllAssetList(this.category)
    .subscribe(res=>{
      _.forEach(res, asset=>{
          console.log('all assets',res);
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
/* Akshay code for customise delete modal */
setAsset(asset,e){
  this.selectedAsset = asset;
  e.preventDefault();
  e.stopPropagation();
}
DeleteAsset(asset,e){
   e.preventDefault();
  e.stopPropagation();
  let r =  confirm('Delete Asset?');
  if(r == true){
    console.log('deleteassetId', asset,asset.AssetID);
    const payload = {AssetID:asset.AssetID, assetSno:asset.AssetSerialNo}
    this._assetService.DeleteAsset(payload)
    .subscribe(res=>{
      console.log('res from delete asset', res);
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
onKey(){
  console.log(this.searchText);
  this._assetService.setSearchText(this.searchText)
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
  this.snackBar.open("Asset has been successfully associated", 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
  
  this.getAssetInfo();
  jQuery('#associateUser').modal('hide');
  }

  cancel(){
     jQuery('#associateUser').modal('hide');
  }
  OnEdit(){
    this.router.navigate(['/admin/sites/EditAsset']);
  }
  RefreshPlan(){
    this.displayList=[];
    this.getAssetInfo();
    this._assetService.GetAllAssetList("People")
    .subscribe(res=>{
      console.log("peopl",res.data);
      
     this.displayPeopleList=res.data;
    });
    this._assetService.setRefreshData(this.displayPeopleList);
  }
}
