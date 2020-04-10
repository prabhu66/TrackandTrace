import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../Services/breadcrumb.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetService } from '../../../Services/asset.service';
import { AssetStatus } from '../../../Interfaces/assetStatus';

@Component({
  selector: 'app-dashboard-assets',
  templateUrl: './dashboard-assets.component.html',
  styleUrls: ['./dashboard-assets.component.css']
})
export class DashboardAssetsComponent implements OnInit {

  public assetList: AssetStatus[] = [];
  public assetObject: AssetStatus;
  JSONres: any;
  public asset_status;
  showModal: boolean;
  modalAssetName: string;
  modalAssetType: string;
  AssetTemp:number=25.6;
  category:string="Material";
  
  constructor(
    private breadcrumb: BreadcrumbService,
    private router: Router,
    private assetService: AssetService) {
      this.assetList = [];
      this.showModal=false;
     }

  ngOnInit() {
    this.breadcrumb.curstate.subscribe(asset_status => this.asset_status = asset_status);

    this.assetService.GetAllAssetStatusforDashBoard(this.category)
      .subscribe(res => {
        console.log(res);
        
        this.JSONres = res.data;
        // console.log(this.JSONres);

        for (let i = 0; i < this.JSONres.length; i++) {
          // this.assetObject = {};
          this.assetObject = {
            AssetID : this.JSONres[i].AssetID,
            AssetName : this.JSONres[i].AssetName,
            AssetType : this.JSONres[i].AssetType,
            AssetSerialNo: this.JSONres[i].AssetSerialNo,
            AssetTagSerialNo: this.JSONres[i].AssetTagSerialNo,
            Status: this.JSONres[i].Status,
            AssetLocation: this.JSONres[i].AssetLocation,
            StartDateTime: this.JSONres[i].StartDateTime,
            BleStatus: this.JSONres[i].BleStatus,
            TrackerStatus: this.JSONres[i].TrackerStatus,
            User: this.JSONres[i].User,
            AssetImageUrl: this.JSONres[i].AssetImageUrl,
            LastUpdatedtDateTime: this.JSONres[i].LastUpdatedtDateTime,
            AssetTrackerNo: this.JSONres[i].AssetTrackerNo,
            AssetCategory: this.JSONres[i].AssetCategory,
            IndoorAlertsCount: this.JSONres[i].IndoorAlertsCount,
            Temperature:this.JSONres[i].Temperature,
            Humidity:this.JSONres[i].Humidity,
          };
          this.assetList.push(this.assetObject);
        }
        console.log(this.assetList);
      });
  }

  reload() {
    this.assetList = [];
    this.ngOnInit();
  }
  setAssetName(assetId, assetName) {
    this.assetService.assetId = assetId;
    this.assetService.assetName = assetName;
    this.assetService.setAssetName(assetName);
    sessionStorage.setItem('assetName', assetName);
    sessionStorage.setItem('assetId', assetId);
    console.log('inside specific assets');
    console.log(assetName);
    
    this.breadcrumb.changeCurrState(assetName);
    this.router.navigate(['/dashboard/specific-asset']);
  }

  setAssetForModal(assetId, assetName,assetType) {
    this.assetService.assetId = assetId;
    this.assetService.assetName = assetName;
    sessionStorage.setItem('assetName', assetName);
    sessionStorage.setItem('assetId', assetId);
    this.modalAssetName = assetName;
    this.modalAssetType = assetType;
    this.showModal = true;
    this.assetService.setAssetName(assetName);
  }

}
