import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../Services/breadcrumb.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetService } from '../../../Services/asset.service';
import { AssetStatus } from '../../../Interfaces/assetStatus';

@Component({
  selector: 'app-holding-assets',
  templateUrl: './holding-assets.component.html',
  styleUrls: ['./holding-assets.component.css']
})
export class HoldingAssetsComponent implements OnInit {

  public assetList: AssetStatus[] = [];
  public assetObject: AssetStatus;
  JSONres: any;
  public asset_status;
  public assetName;
  showModal: boolean;
  modalAssetName: string;
  modalAssetType: string;
  AssetTemp:number=25.6;
  
  constructor(
    private breadcrumb: BreadcrumbService,
    private router: Router,
    private assetService: AssetService) {
      this.assetName = this.assetService.assetName || sessionStorage.getItem('assetName');
      this.assetList = [];
      this.showModal=false;
     }

  ngOnInit() {
    this.breadcrumb.curstate.subscribe(asset_status => this.asset_status = asset_status);
    console.log("assetName", this.assetName);
    
    this.assetService.GetHoldingAsset(this.assetName)
      .subscribe(res => {

        this.assetList=res.data;

        // console.log(this.JSONres);

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
    this.breadcrumb.changeCurrState(assetName);
    this.router.navigate(['/dashboard/people-specific']);
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
