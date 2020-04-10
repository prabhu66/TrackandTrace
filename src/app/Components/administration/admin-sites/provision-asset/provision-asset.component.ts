import { Component, OnInit } from '@angular/core';

import { MapService } from '../../../../Services/map.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetService } from 'src/app/Services/asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


// Added By ABhishek
import { AppSetting } from '../../../constants/AppSetting';
import { ISasToken } from './azure-storage/azureStorage';
// import { BlobStorageService } from './azure-storage/blob-storage.service';
import { from, Observable } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.prod';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
// Abhishek Declaration ENds Here

interface IUploadProgress {
  filename: string;
  progress: number;
}

export interface Facility {
  FacilityId: string;
  FacilityName: string;
  ZoneId: string;
  ZoneName: string;
}


@Component({
  selector: 'app-provision-asset',
  templateUrl: './provision-asset.component.html',
  styleUrls: ['./provision-asset.component.css']
})
export class ProvisionAssetComponent implements OnInit {

  subList1: Array<boolean> = [];
  subList2: Array<boolean> = [];
  geofences = new Array;
  rest_geofence = new Array;
   facilities = new Array;
  geofence;
  // drop1:boolean;
  drop2: boolean;
  drop3: boolean;
  drop4: boolean;
  drop5: boolean;
  drop6: boolean;
  GPSTracker: string="";
  zones1 = new Array;
  zones2 = new Array;
  save_zone_object = new Array();
  array_of_param = new Array;
  monitor_params: string[] = ['shock', 'Temperature', 'humidity'];
  mon_param;
  public asset_categories:string[]=['Indoor Only','Outdoor Only', 'Indoor and Outdoor'];
  public assetCategory:string ="Indoor Only";
  public assetType="People";
  public people:string[]=["Janitor","WorkerStaff","Electrician","Engineer","Software Developers"];
  public products:string[]=['Swings','Laptops','Printer'];
  public product_type;
  public product_names;
  public product_name;
  public asset_name;
  public asset_id;
  public assetBleTag:string="";
  public array_of_ble=new Array;
  public array_of_gps= new Array;
  accessible_facility: Array<Facility> = [];
  res_facility: Array<Facility> = [];
  public demo_facility = {
    FacilityId: '',
    FacilityName: '',
    ZoneId: '',
    ZoneName: ''
  };

    public demo_facility2 = {
    FacilityId: '',
    FacilityName: '',
    ZoneId: '',
    ZoneName: ''
  };
 
  submitted = false;

  
  // Asset Image Related Variables
  fileInfo: any;
  uploadProgress$: Observable<IUploadProgress[]>;
  filesSelected = false;
  fileName: FileList;
  blobAccessUrl = AppSetting.blobAccessUrl;
  fileUploadProgress: number;
  showLoader: boolean;
  showUploadComplete: boolean;
  imageRefUrl = '';
  showImageUploaded: boolean;
  public drop1 = false;
  public i=0;
  public j=0;
  public m=0;
  public arr = [];
  status = '';
  uploadForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private _dataService: MapService,
     private _assetservice: AssetService,
     private router: Router,
     private snackBar: MatSnackBar,
    //  private blobStorage: BlobStorageService,
     private us: AssetService

     ) { 
       this.showImageUploaded = false;
     }


  // Upload Asset Image Section Here =================================================
  // onFileChange(event: any): void {
  //   this.showLoader = true;
  //   this.showUploadComplete = false;
  //   this.filesSelected = true;

  //   this.uploadProgress$ = from(event.target.files as FileList).pipe(
  //     map(file => this.uploadFile(file)), // Getting FIle Details HEre
  //     combineAll()
  //   );


  // }

  // uploadFile(file: File): Observable<IUploadProgress> {
  //   this.fileName = file.name;

  //   const accessToken: ISasToken = {
  //     container: 'assetimages',
  //     filename: file.name,
  //     storageAccessToken: AppSetting.SAS_Token,
  //     // tslint:disable-next-line:max-line-length
  //     // storageUri: 'https://titanstorageaccnt.blob.core.windows.net/' + AppSetting.SAS_Token,
  //     storageUri: AppSetting.storageLink + AppSetting.SAS_Token,
  //    // Add SAS Token After .net/ --> If the token Expires in Future
  //   };

  //   this.imageRefUrl = this.blobAccessUrl + this.fileName;
  //   console.log(this.imageRefUrl);
  //   // console.log(accessToken.storageUri);
  //   return this.blobStorage
  //     .uploadToBlobStorage(accessToken, file)
  //     .pipe(map(progress => this.mapProgress(file, progress)));
  // }

  // private mapProgress(file: File, progress: number): IUploadProgress {
  //   console.log(progress);

  //      if (progress === 100) {
  //        this.showLoader = false;
  //        this.showUploadComplete = true;
  //        this.filesSelected = false;
  //        this.showImageUploaded = true;
  //      }
  //      console.log(progress);
  //      return {
  //        filename: file.name,
  //        progress: progress
  //      };
      
  //    }

  // Upload Asset Image Section ENds Here =============================================


  // uploadFile(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.uploadForm.patchValue({
  //     sampleFile: file
  //   });
  //   this.uploadForm.get('sampleFile').updateValueAndValidity();
  //   this.showImageUploaded = true
    
  // }


  //Upload Facility Image  on AWS Section ==================>

 

onFileChange(event,folder) {
 
  this.fileName = event.target.files;
  this.upload(folder);
}
upload(folder) {
  const file = this.fileName.item(0);
  this.showLoader = true;
  this.showUploadComplete = false;
  this.filesSelected = true;
  this.uploadFile(file, folder);
}
uploadFile(file, folder) {
  /* const contentType = file.type;
  const bucket = new S3(
    {
      accessKeyId: environment.AWS_Access_Key,
      secretAccessKey: environment.AWS_Secret_Key,
      region: 'ap-south-1'
    }
  );
  const params = {
    Bucket: 'trackntrace-floorplan-image',
    Key: folder + file.name,
    Body: file,
    ACL: 'public-read',
    ContentType: contentType
  }; */
  this._assetservice.uploadImage(file).subscribe(
    (res:any)=>{
    let x = JSON.parse(res._body);
    console.log('img upld',x);
    
    this.imageRefUrl = x.result.url;
    this.showLoader = false;
    this.showUploadComplete = true;
    //this.showImage = true;
    this.filesSelected = false;
    this.showImageUploaded = true;
    },(err)=>{
      console.log(err)
    }
  );
 /*  bucket.upload(params, (err, data) => {
    if (err) {
      console.log('There was an error uploading your file: ', err);
      return false;
    }
    this.fileInfo = data;
    this.imageRefUrl = this.fileInfo.Location;
    this.showLoader = false;
    this.showUploadComplete = true;
    this.filesSelected = false;
    this.showImageUploaded = true;
    return (this.fileInfo);
  });
 */
  // for upload progress
 /*  bucket.upload(params).on('httpUploadProgress', (evt) => {
    console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
  }).send(function (err, data) {
    if (err) {
      console.log('There was an error uploading your file: ', err);
      return false;
    }
    console.log('Successfully uploaded PROGRESS file.', data);
    this.showLoader = false;
    this.showUploadComplete = true;
    this.showImage = true;
    this.filesSelected = false;
    this.showImageUploaded = true;
  }); */
}
//Upload Image to AWS Section Ends Here =============>


  ngOnInit() {
    // this.form = this.fb.group({
    //   asset_type: ['', Validators.required],
    //   asset_name: ['', Validators.required],
    //   asset_id: ['', Validators.required],
    //   asset_category: ['', Validators.required],
    //   assetBleTag: ['', Validators.required],
    //   GPS_Tracker: ['', Validators.required],
    // });
    this.uploadForm = this.fb.group({
      sampleFile: ''
    });

    this._dataService.modalId = '#exampleModalLong';
    this._assetservice.GetGeofenceList().subscribe(res=>{
           console.log(res);
            this._dataService.geofences=res.data;
            this._dataService.rest_geofences=res.data;
          });
    this._assetservice.GetFacilityList()
      .subscribe(res => {
        console.log('res from facility', res);
        this.facilities = res.data;
        console.log(this.facilities);
        for (let i = 0; i < this.facilities.length; i++) {
          this.subList1.push(false);
          this.subList2.push(false);
          console.log(this.facilities[i].FacilityName)
          this._assetservice.GetZonebyFacility(this.facilities[i].FacilityName)
          .subscribe(res => {
            console.log( res.data);
            this.arr[this.facilities[i].FacilityName]=res.data;
            console.log(this.arr);
          });
        }
      });
      this._assetservice.GetTaglist().subscribe(res=>{
        console.log('res from tag',res)
        for(let i=0;i<res.data.length;i++){
            this.array_of_ble.push(res.data[i].DeviceSerialNo);
        }
        
      })
       this._assetservice.GetTrackerList().subscribe(res=>{
        console.log('res from tracker',res.data)
        for(let i=0;i<res.data.length;i++){
            this.array_of_gps.push(res.data[i].DeviceSerialNo);
        }
        
      })

    this._dataService.currentMessage.subscribe(geofence => this.geofence = geofence);
  }
 

  onClick1(value, i) {
    // this.subList.fill(false);
    this.subList1[i] = !this.subList1[i];
  


  }
    onClick2(value, i) {
    // this.subList.fill(false);
    this.subList2[i] = !this.subList2[i];

  }

  onSelect(value) {
    console.log(value);
    this.array_of_param.push(value);
  }
  delete(i) {
    this.array_of_param.splice(i, 1);
  }
  showGeofence(geofence) {
    console.log('Inside provision asset' + geofence);
    this.geofence = geofence.name;
    this._dataService.changeMessage(geofence);
  }
  onCheckboxChange1(event, zone, k) {
     const demo_facility2 = {
           FacilityId: '',
           FacilityName: '',
           ZoneId: '',
           ZoneName: ''
  };
  let flag = 0;
    console.log(zone);
    console.log('checkbox1');
    if (event.target.checked) {
       if (this.res_facility.length > 0) {
            for (let m = 0; m < this.res_facility.length; m++) {
          if (this.res_facility[m].ZoneName === zone.ZoneName) {
            this.snackBar.open(zone.ZoneName + 'not allowed', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
           
            event.target.checked = false;

          } else {
              continue;
          }

       }
       if (flag == 0) {
             this.accessible_facility.push(demo_facility2);
            this.accessible_facility[this.i].FacilityId = this.facilities[k].FacilityID;
             this.accessible_facility[this.i].FacilityName = this.facilities[k].FacilityName;
              this.accessible_facility[this.i].ZoneId = zone.ZoneID;
              console.log(this.accessible_facility[this.i].ZoneId);
              this.accessible_facility[this.i].ZoneName = zone.ZoneName;
              this.i++;
       }


       console.log(this.accessible_facility);
       } else {

         this.accessible_facility.push(demo_facility2);
         console.log(this.demo_facility2);
         console.log(this.accessible_facility);
         this.accessible_facility[this.i].FacilityId = this.facilities[k].FacilityID;
           this.accessible_facility[this.i].FacilityName = this.facilities[k].FacilityName;
          this.accessible_facility[this.i].ZoneId = zone.ZoneID;
          console.log(this.accessible_facility[this.i].ZoneId);
          this.accessible_facility[this.i].ZoneName = zone.ZoneName;
          this.i++;
       }

    }
     if (!event.target.checked) {
      for (let j = 0; j < this.accessible_facility.length; j++) {
        if (this.accessible_facility[j].ZoneName === zone.ZoneName) {
           this.accessible_facility.splice(j, 1);
           this.i = this.i - 1;
        }
      }

     }
    // }  this.facility[i].zones.push(value);

  }
  onCheckboxChange2(event, zone, k) {

   const demo_facility = {
           FacilityId: '',
           FacilityName: '',
           ZoneId: '',
           ZoneName: ''
  };
  let flag = 0;
  console.log(k, zone, this.facilities[k]);
     console.log('checkbox2');
    if (event.target.checked) {
       if (this.accessible_facility.length > 0) {
            for (let m = 0; m < this.accessible_facility.length; m++) {
              console.log(m, this.accessible_facility.length, this.accessible_facility[m]);
             if (this.accessible_facility[m].ZoneName === zone.ZoneName) {
              this.snackBar.open(zone.ZoneName + 'not allowed', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
               
                 event.target.checked = false;
                  flag = 1;
              } else {
            continue;
          }
       }
       if (flag === 0) {
               this.res_facility.push(demo_facility);
             this.res_facility[this.j].FacilityId = this.facilities[k].FacilityID;
             this.res_facility[this.j].FacilityName = this.facilities[k].FacilityName;
              this.res_facility[this.j].ZoneId = zone.ZoneID;
              this.res_facility[this.j].ZoneName = zone.ZoneName;
              this.j++;
       }


       } else {
         this.res_facility.push(demo_facility);
          this.res_facility[this.j].FacilityId = this.facilities[k].FacilityID;
           this.res_facility[this.j].FacilityName = this.facilities[k].FacilityName;
          this.res_facility[this.j].ZoneId = zone.ZoneID;
          this.res_facility[this.j].ZoneName = zone.ZoneName;
          this.j++;
       }

    }
     if (!event.target.checked) {
      for (let j = 0; j < this.res_facility.length; j++) {
        if (this.res_facility[j].ZoneName === zone.ZoneName) {
           this.res_facility.splice(j, 1);
           this.j = this.j - 1;
        }
      }

     }
  }

  onCheckboxChange3(event, geofence, k) {
    const demo_geofence = {
        GeofenceName: '',
};
 let flag = 0;
  if (event.target.checked) {
    if (this.rest_geofence.length > 0) {
      for (let i = 0; i < this.rest_geofence.length; i++) {
        if (this.rest_geofence[i].GeofenceName === geofence.name) {
          this.snackBar.open(geofence.name + 'not allowed', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
  
           event.target.checked = false;
           flag = 1;
        } else {
          continue;
        }
      }
      if (flag === 0) {
         this.geofences.push({'GeofenceName': geofence.name});
         console.log(this.geofences);
      }
    } else {
       this.geofences.push({'GeofenceName': geofence.name});
       console.log(this.geofences);
    }

  }
 if (!event.target.checked) {
      for (let j = 0; j < this.geofences.length; j++) {
     if (this.geofences[j].GeofenceName === geofence.name) {
        this.geofences.splice(j, 1);

     }
   }
 }
}

onCheckboxChange4(event, geofence, k) {

  let flag = 0;
   if (event.target.checked) {
     if (this.geofences.length > 0) {
       console.log(this.geofences.length);
       for (let i = 0; i < this.geofences.length; i++) {
         console.log(this.geofences[i], geofence.name);
         if (this.geofences[i].GeofenceName === geofence.name) {
          this.snackBar.open(geofence.name + 'not allowed', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
            event.target.checked = false;
            flag = 1;
         } else {
           continue;
         }
       }
       if (flag === 0) {
          this.rest_geofence.push({'GeofenceName': geofence.name});
          console.log(this.rest_geofence);
       }
     } else {
        this.rest_geofence.push({'GeofenceName': geofence.name});
        console.log(this.rest_geofence);
     }

   }
  if (!event.target.checked) {
        for (let j = 0; j < this.rest_geofence.length; j++) {
      if (this.rest_geofence[j].GeofenceName === geofence.name) {
         this.rest_geofence.splice(j, 1);

      }
    }
  }
}
  onSubmit(formValue: any) {
  /*   console.log('inside submit');
    console.log(this.accessible_facility.length);
   console.log(this.geofences);
   console.log(this.rest_geofence);
   console.log(this.assetCategory); */

     this.submitted = true;
     console.log(this.uploadForm.controls['sampleFile']);
     try {
       let res = this.us.upload(this.uploadForm);
       this.status = res['message'];
     } catch (e) {
       console.log(e);
     }

    // stop here if form is invalid
    // if (formValue.invalid) {
    //   console.log("inside form invalid")
    //   this.submitted=false;
    //   return;
    // }

    if(this.assetCategory=="Indoor Only"){
      if(this.accessible_facility.length==0 || this.assetBleTag==""){
        console.log("1");
        this.snackBar.open('Please select  a ble tag and an accessible zone', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});

        
        this.submitted=false;
        return;
      }
    }
    else if(this.assetCategory=="Outdoor Only" ){
      if(this.geofences.length==0 || this.GPSTracker=="" ){
        console.log("2");
        this.snackBar.open('Please select  a gps tracker and an accessible geofence', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
        this.submitted=false;
        return;
      }
    }
    else{
      if(this.accessible_facility.length==0 || this.geofences.length==0 || this.assetBleTag=="" || this.GPSTracker=="" ){
        console.log("3");
        this.snackBar.open('Please select  ble tag, gps tracker and accessible zone and accessible geofence', 'Ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});

        this.submitted=false;
        return;
      }
    }
    
    if(this.submitted==true){
      
        let payload = {
      AssetName: this.asset_name,
      AssetType: this.product_type,
      AssetSerialNo: this.asset_id,
      AssetTrackerNo: this.GPSTracker,
      AssetTagSerialNo: this.assetBleTag,
      AccessibleZones: this.accessible_facility,
      RestrictedZones: this.res_facility,
      AccessibleGeofence: this.geofences,
      RestrictedGeofence: this.rest_geofence,
      AssetImageUrl: this.imageRefUrl,
      AssetCategory:this.assetType,
      TrackMode: this.assetCategory,
    };
    
    this._assetservice.createAsset(JSON.stringify(payload)).subscribe(res => {
      console.log('RES FROM CREATE',res);
    });
    this.router.navigate(['admin/sites/AssetManagement']);
    }
  
    
  }
  cancel() {
    this.router.navigate(['admin/sites/AssetManagement']);
  }


}
