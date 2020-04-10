import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AssetService } from 'src/app/Services/asset.service';
import { MapService } from '../../../../../Services/map.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Added By ABhishek
import { FacilityImageSettings } from '../../../../constants/AppSettings';
import { ISasToken } from '../azure-storage/azureStorage';
import { BlobStorageService } from '../azure-storage/blob-storage.service';
import { from, Observable } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment.prod';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
// Abhishek Declaration ENds Here

interface IUploadProgress {
  filename: string;
  progress: number;
}
@Component({
  selector: 'app-admin-facility',
  templateUrl: './admin-facility.component.html',
  styleUrls: ['./admin-facility.component.css']
})
export class AdminFacilityComponent implements OnInit {
  /* declaration of viewchild for autoclose modal */
  @ViewChild('closebutton') closebutton;
  @ViewChild('closedelModal') closedelModal;

  url:string
  highlight: Array<boolean> = [];
  public pos = [];
  public image;
  public Selected;
  public index;
  public facilityName;
  public Location;
  public status;
  public ZoneForm: FormGroup;
  public zones =[];
  public posx;
  public posy;
  public facilityList = [];
  public showImage = false;
  public showHeader = true;
  public searchText;
  click: any;
  public FacilityID;

    // Asset Image Related Variables
    fileInfo: any;
    uploadProgress$: Observable<IUploadProgress[]>;
    filesSelected = false;
    fileName: FileList;
    blobAccessUrl = FacilityImageSettings.blobAccessUrl;
    fileUploadProgress: number;
    showLoader: boolean;
    showUploadComplete: boolean;
    imageRefUrl = '';
    showImageUploaded: boolean;
    GatewayList:any;
    uploadForm: FormGroup = new FormGroup({});
    public new = true;
    /* declaration for enahancement Akshay */
    busy:boolean = false;
    imgupload:boolean = false;
    selectedFloorId:any;
  constructor(private fb: FormBuilder,
    private _dataService: MapService,
    private _assetservice: AssetService,
    private blobStorage: BlobStorageService,
    private us: AssetService,
    private snackBar: MatSnackBar,
    private el:ElementRef) { 

    this.showImageUploaded = false;
    this.ZoneForm = this.fb.group({
      zoneName:[null, Validators.required],
      bleGatewaySno:[null, Validators.required]
    });
    this.busy = true;
    this._assetservice.GetGatewayList()
  .subscribe(res=>{
    this.GatewayList = res.data;
    console.log('GATEWAY',this.GatewayList);
  })

  this.getAllFacilityList();
   }
    ngOnInit() {
     
    }

  //    // Upload Asset Image Section Here =================================================
  // onFileChange(event,folder) {
  //   this.showLoader = true;
  //   this.showUploadComplete = false;
  //   this.filesSelected = true;
  //   this.uploadProgress$ = from(event.target.files as FileList).pipe(
  //     map(file => this.uploadFile(file,folder)), // Getting FIle Details HEre
  //     combineAll()
  //   );

  // }

  // uploadFile(file: File): Observable<IUploadProgress> {
  //   this.fileName = file.name;

  //   const accessToken: ISasToken = {
  //     container: 'faclityimage',
  //     filename: file.name,
  //     storageAccessToken: FacilityImageSettings.SAS_Token,
  //     storageUri: FacilityImageSettings.storageLink + FacilityImageSettings.SAS_Token,
  //   };
  //   this.imageRefUrl = this.blobAccessUrl + this.fileName;
  //   console.log(this.imageRefUrl);
  //   return this.blobStorage
  //     .uploadToBlobStorage(accessToken, file)
  //     .pipe(map(progress => this.mapProgress(file, progress)));
  // }

  // private mapProgress(file: File, progress: number): IUploadProgress {
  //      if (progress === 100) {
  //        this.showLoader = false;
  //        this.showUploadComplete = true;
  //        this.showImage = true;
  //        this.filesSelected = false;
  //        this.showImage = true;

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
  const contentType = file.type;
  /* const bucket = new S3(
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
  console.log(file);
  this._assetservice.uploadImage(file).subscribe(
    (res:any)=>{
    let x = JSON.parse(res._body);
    this.imageRefUrl = x.result.url;
    this.showLoader = false;
    this.showUploadComplete = true;
    this.showImage = true;
    this.filesSelected = false;
    this.showImageUploaded = true;
    },(err)=>{
      console.log(err)
    }
  );
  // bucket.upload(params, (err, data) => {
  //   if (err) {
  //     console.log('There was an error uploading your file: ', err);
  //     return false;
  //   }
  //   // console.log('Successfully uploaded file.', data);
  //   this.fileInfo = data;
  //   this.imageRefUrl = this.fileInfo.Location;
  //   this.showLoader = false;
  //   this.showUploadComplete = true;
  //   this.showImage = true;
  //   this.filesSelected = false;
  //   this.showImageUploaded = true;
  //   return (this.fileInfo);
  // });

  // for upload progress
  // bucket.upload(params).on('httpUploadProgress', (evt) => {
  //   console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
  // }).send(function (err, data) {
  //   if (err) {
  //     console.log('There was an error uploading your file: ', err);
  //     return false;
  //   }
  //   console.log('Successfully uploaded PROGRESS file.', data);
  //   // return true;
  //   this.showLoader = false;
  //   this.showUploadComplete = true;
  //   this.showImage = true;
  //   this.filesSelected = false;
  //   this.showImageUploaded = true;
  // });
    /* this.showLoader = false;
    this.showUploadComplete = true;
    this.showImage = true;
    this.filesSelected = false;
    this.showImageUploaded = true; */
}
//Upload Image to AWS Section Ends Here =============>
    getLocationPoints(e){
      this.ZoneForm.reset();
      if(this.imageRefUrl){
        var svg = this.el.nativeElement.querySelector('#mySvg');
        var pt = svg.createSVGPoint();
        pt.x= e.clientX; //x position within the element.
        pt.y= e.clientY;
        var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        this.posx = svgP.x;
        this.posy = svgP.y;
        // var rect = e.target.getBoundingClientRect();
        // this.posx = e.clientX - rect.left; //x position within the element.
        // this.posy= e.clientY - rect.top;
        console.log(this.posx, this.posy)

      }
    }
    public highlightOption(i, options){
      this.highlight.fill(false);
      this.highlight[i]=!this.highlight[i]
      this.Selected = options;
    }
    getFloorImage(floor){
      this.imageRefUrl = floor.ImageUrl;
      this.zones = floor.Zones;
      this.facilityName = floor.FacilityName;
      this.Location  = floor.Location;
      this.FacilityID = floor.FacilityID || '';
      this.showImage = true;
      console.log('zones', this.zones);
      console.log('zonesfloor', floor)
    }

    public getAllFacilityList(){
      this._assetservice.GetAllFacilityList()
      .subscribe(res=>{
        console.log(res);
        
        this.facilityList = res.data;
        console.log(this.facilityList);
        this.busy = false;
      })
    }
    public SaveZones(post){
      if(post.zoneName && post.bleGatewaySno){
        this.pos.push({x:this.posx,y:this.posy});
        /* this.zones.push({
          ZoneName : post.zoneName,
          GatewaySlNo :post.bleGatewaySno,
          Top:this.posy,
          Left:this.posx
        }); */
        this.zones.push({
          ZoneName : post.zoneName,
          //GatewaySlNo :post.bleGatewaySno,
          GatewaySINo :post.bleGatewaySno,
          Top:(this.posy).toString(),
          Left:(this.posx).toString()
        });
        console.log('zones', this.zones);
        this.closebutton.nativeElement.click();
      }
     }
     resetForm(){
       this.ZoneForm.reset();
     }
     CreateFacility(){
       if(!this.facilityName){
        // window.alert('Provide a name for the facility');
        this.snackBar.open('Provide a name for the facility', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
       }
       else if(!this.imageRefUrl){
        // window.alert('Provide a facility map');
        this.snackBar.open('Provide a facility map', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
       }
       else{
         let ts = Date.now();
         const payload = {
          FacilityName:this.facilityName,
          Location:this.Location,
          CreatedTime:ts.toString(),
          IsActive:true,
          Zones:this.zones,
          ImageUrl: this.imageRefUrl,
          //Status: this.status,
          Status: "Active"
         }
         console.log(payload);
         this.imgupload = false;
         this._assetservice.CreateFacility(payload)
         .subscribe(res=>{
          this.imgupload = false;
           console.log(res)
          //  window.alert('Facility Created');
          this.snackBar.open('Facility Created', 'ok',{duration: 3000,horizontalPosition:'start'});
          
           this.Abort();
           this.showImage =false;
           this.getAllFacilityList();
         });
         
         console.log(this.uploadForm.controls['sampleFile']);
         try {
           let res = this.us.upload(this.uploadForm);
           this.status = res['message'];
         } catch (e) {
           console.log(e);
         }
       }
     }
     public Abort(){
      this.facilityName = '';
      this.Location = '';
      this.imageRefUrl = '';
      this.pos = [];
      this.zones = [];
      this.showImage =false;
     }
     UpdateFacility(){
      const payload = {
        FacilityName:this.facilityName,
        Location:this.Location,
        Zones:this.zones,
        ImageUrl: this.imageRefUrl,
        FacilityID:this.FacilityID
       }
       console.log(payload);
       this._assetservice.UpdateFacility(payload)
       .subscribe(res=>{
         console.log(res);
         
         if(res['statusCode']==200){
           window.alert('Facility Updated');
          this.snackBar.open('Facility Updated', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
         this.getAllFacilityList();
         this.Abort();
         }
         
       });
     }
     DeleteFacility(){
       this.busy = true;
       let FacId =  this.selectedFloorId;
      /* var r = confirm("Delete Facility?");
      if (r == true) {
        this._assetservice.DeleteFacility(FacId)
        .subscribe(res=>{
          this.getAllFacilityList();
          this.Abort();
          this.new =false;
        })
      } */
      /* modified by akshay */
      this.closedelModal.nativeElement.click();
      
      this._assetservice.DeleteFacility(FacId)
        .subscribe(res=>{
          this.busy = true;
          this.getAllFacilityList();
          this.Abort();
          this.new =false;
        })
        this.busy = false;
      }

      RefreshPlan(){

         this.showImageUploaded = false;
    this.ZoneForm = this.fb.group({
      zoneName:[null, Validators.required],
      bleGatewaySno:[null, Validators.required]
    });
    this.facilityList=[];
    this.getAllFacilityList();
   
      }

      // OnEdit(zone, i){
      //   this.Selected = zone;
      //   this.index=i;
      // }
    /* delete modal code Akshay */
    selectdId(id){
      this.selectedFloorId = id;
    }
}
