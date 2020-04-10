import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


import { FormGroup } from '@angular/forms';

import { getFacilityList,GetGatewayList,GetAllAccounts,GetZonebyFacility,CreateAsset,GetAllAsset , 
  GetZoneAssetDetails,CreateGeofence, CreateUser, DeleteUser, GetGeofenceList,GetMapDetails,GetUtilizationData,GetUserList,
  CreateDevices,DeleteAsset,GetTagLists,GetAllUsers,GetAllAssetStatusforDashBoard,GetAllAssetsInFacilities, GetTrackerLists,DeleteDevices,DeleteGeofence,UpdateFacility,
   CreateFacility, AssociateAssetUser,DeleteFacility,GetAllFacilityInfo,EditDevices,
  CreateGateway,DeleteGateway,PeopleAttendance,
  GetAssetStatusDetailsDashboard,GetPersonStatusDetailsforDashboard,
  GetAssetHistory,GetTotalAssetStatus,GetAssetAlertHistory,GetHoldingAsset,ReleaseAsset,GetAllAssetsInFacilitiesMaterial,GetUtilizationDataPeople,UploadImage,
  FetchImage,
  ImageUpload





} from 'src/app/Components/constants/apiUrl';
  

import { interval } from 'rxjs';

@Injectable()
export class AssetService {
  constructor(
    private http: Http) { }
   public loadPromise: Promise<void>;
   public loadAPI: Promise<any>;
  // Abhishek's Variable Declaration
  public assetName: string;
  public assetId: number;
  public device: string;
  public selectedZones:any;
  public searchAdminText:any;
  public editAsset:object;

  private AssetName = new BehaviorSubject('');
  GetAssetName = this.AssetName.asObservable();

  setAssetName(message: any) {
    this.AssetName.next(message);

  }
  private search = new BehaviorSubject('');
  GetSearchText = this.search.asObservable();

  setSearchText(message: any) {
    this.search.next(message);

  }

  private refreshPeople = new BehaviorSubject('');
  GetRefreshData = this.refreshPeople.asObservable();

  setRefreshData(message: any) {
    this.refreshPeople.next(message);

  }
  // Abhishek's Declaration Ends HEre ++++++++++++++++++++++++



 public load(): Promise<void> {
        if (this.loadPromise) {
            return this.loadPromise;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;

        const mapsCallback = 'mapOnInit';
        script.src = 'http://www.bing.com/api/maps/mapcontrol?callback=mapOnInit&key=Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw';

        this.loadPromise = new Promise<
            void
            >((resolve: Function, reject: Function) => {
                window[mapsCallback] = () => {
                  console.log("map function resolved");

                    resolve();
                };
                script.onerror = (error: Event) => {
                    console.error('maps script error' + error);
                    reject(error);
                };
            });

        document.body.appendChild(script);

        return this.loadPromise;
    }
  /**
   * uploadImage
   */
  public uploadImage(image:File) {
    const formData = new FormData();

    formData.append('img-file', image);

    return this.http.post(ImageUpload, formData).pipe(map(result => result));
  }
  public setRequestObject(apiUrl) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('APIKey', '16d49c9b-de55-4492-99d4-68b7ef1edc83');
    const options = new RequestOptions({ headers });
    const requestObj = this.http.get(apiUrl, options);
    console.log('inside the service', requestObj);
    return requestObj;
  }

  public createGateway(payload) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(CreateGateway, payload, options)
      .pipe(map(result => result));
  }

  public getAssetList(apiUrl) {
    return this.setRequestObject(apiUrl)
      .pipe(map((response) => (response.json())));
  }

  // public GetMapDetails(payload) {
  //   return this.http.post(GetMapDetails, {})
  //   .pipe(map(res => res.json()));
  // }

  public GetMapDetails2(payload) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization',this.basic);
    const options = new RequestOptions({ headers: headers });

    return interval(30000).pipe(switchMap(() => this.http.post(GetMapDetails, {}))
      , map(res => res.json()));
  }
  public createAsset(payload) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(CreateAsset, payload, options)
      .pipe(map(result => result));
  }

 
  public createUser(payload) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(CreateUser, payload, options)
      .pipe(map(result => result));
  }

  public createDevices(payload) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(CreateDevices, payload, options)
      .pipe(map(result => result));
  }

  public DeleteDevice(payload) {
    return this.http.post(DeleteDevices, payload)
      .pipe(map(res => res.json()));
  }
  public DeleteUser(payload) {
    return this.http.post(DeleteUser, payload)
      .pipe(map(res => res.json()));
  }
  public EditDevice(payload) {
    return this.http.post(EditDevices, payload)
      .pipe(map(res => res.json()));
  }

  public DeleteGeofence(payload) {
    return this.http.post(DeleteGeofence, payload)
      .pipe(map(res => res.json()));
  }
  public DeleteGateway(payload) {
    return this.http.post(DeleteGateway, payload)
      .pipe(map(res => res.json()));
  }

  public GetTaglist() {
    return this.http.post(GetTagLists, {})
      .pipe(map(res => res.json()));
  }
  // public GetGatewayList(){
  //   return this.http.post(GetAllGateways, {})
  //     .pipe(map(res => res.json()));
  // }
  public GetAllAssetsInFacilities(category) {
    return this.http.get(GetAllAssetsInFacilities + category)
      .pipe(map(res => res.json()));
  }
  public GetAllAssetsInFacilitiesMaterial() {
    return this.http.get(GetAllAssetsInFacilitiesMaterial)
      .pipe(map(res => res.json()));
  }
  public GetTrackerList() {
    return this.http.post(GetTrackerLists, {})
      .pipe(map(res => res.json()));
  }

  public GetUserList() {
    return this.http.post(GetUserList, {})
      .pipe(map(res => res.json()));
  }
  public GetFacilityList() {
    return this.http.post(getFacilityList, {})
      .pipe(map(res => res.json()));
  }
  public CreateFacility(facility) {
    return this.http.post(CreateFacility, facility)
      .pipe(map(res => res.json()));
  }
  public UpdateFacility(facility) {
    return this.http.post(UpdateFacility, facility)
      .pipe(map(res => res.json()));
  }

  public GetAllFacilityList() {
    return this.http.post(GetAllFacilityInfo, {})
      .pipe(map(res => res.json()));
  }
  public UploadFile(imageRefUrl) {
    return this.http.post(UploadImage, imageRefUrl)
    .pipe(map(res =>res.json()))
  }
  public FetchImage() {
    return this.http.post(FetchImage, {})
    .pipe(map(res =>res.json()))
  }

  
  //  public GetGeofenceList() {
  //     return this.http.post(GetGeofenceList, {})
  //     .pipe(map(res => res.json()));
  //   }

  //  public GetGeofenceNameList() {
  //     return this.http.post(GetGeofenceName, {})
  //     .pipe(map(res => res.json()));
  //   }
  public GetAllAssetList(category) {
    return this.http.post(GetAllAsset + category, {})
      .pipe(map(res => res.json()));
  }
  public getUtilizationData(category) {
    return this.http.get(GetUtilizationData + category)
      .pipe(map(res => res.json()));
  }
  public getUtilizationDataPeople() {
    return this.http.get(GetUtilizationDataPeople)
      .pipe(map(res => res.json()));
  }
  public AssociateAssetUser(payload) {
    return this.http.post(AssociateAssetUser, payload)
      .pipe(map(res => res.json()));
  }

  public GetAllAssetList2() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization',this.basic);
    const options = new RequestOptions({ headers: headers });

    return interval(30000).pipe(switchMap(() => this.http.post(GetAllAsset, {}))
      , map(res => res.json()));
  }

  public GetAccountList() {
    return this.http.post(GetAllAccounts, {})
      .pipe(map(res => res.json()));
  }

  public GetZonebyFacility(facName) {
    return this.http.post(GetZonebyFacility + facName, {})
      .pipe(map(res => res.json()));
  }

  public DeleteFacility(facId) {
    return this.http.post(DeleteFacility + facId, {})
      .pipe(map(res => res.json()));
  }
  public GetUsersList() {
    return this.http.post(GetAllUsers, {})
      .pipe(map(res => res.json()));
  }

  public GetZoneAssetDetailsPoll(facilityName) {
    return interval(15000).pipe(switchMap(() =>
      this.http.post(GetZoneAssetDetails + facilityName, {})),
      map(res => res.json()));
  }
  public GetGatewayList(){
    return this.http.post(GetGatewayList, {})
    .pipe(map(res => res.json()));
  }
  public GetZoneAssetDetails(facilityName) {
    return this.http.post(GetZoneAssetDetails + 'FacilityName='+facilityName + '&Category=Material', {})
      .pipe(map(res => res.json()));
  }
  public GetZoneAssetDetails2(facilityName) {
    return this.http.post(GetZoneAssetDetails + 'FacilityName='+facilityName + '&Category=People', {})
      .pipe(map(res => res.json()));
  }

  // public GetAllAssetList2(){
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   // headers.append('Authorization',this.basic);
  //   let options = new RequestOptions({headers: headers});

  // return  interval(30000).pipe(switchMap (() => this.http.post(GetAllAssets, {}))
  //   , map(res => res.json()));
  // }

  public GetGeofenceList() {
    return this.http.post(GetGeofenceList, {})
      .pipe(map(res => res.json()));
  }

  // public GetGeofenceNameList() {
  //   return this.http.post(GetGeofenceName, {})
  //     .pipe(map(res => res.json()));
  // }

  public createGeofence(payload) {
    console.log('inside create geofence');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(CreateGeofence, payload)
      .pipe(map(result => result));
  }

  public GetMapDetails(payload) {
    return this.http.post(GetMapDetails, {})
      .pipe(map(res => res.json()));
  }

  // public GetMapDetails2(payload){
  //       let headers = new Headers();
  //      headers.append('Content-Type','application/json');
  //       // headers.append('Authorization',this.basic);
  //       let options = new RequestOptions({headers:headers});

  //     return  interval(30000).pipe(switchMap (()=>this.http.post(GetMapDetails,{}))
  //       ,map(res => res.json()));
  // }

  public DeleteAsset(payload) {
    return this.http.post(DeleteAsset, payload)
      .pipe(map(res => res.json()));
  }

   // ***********Abhishek's Service STARTS Here******************
  public GetAllAsset( category) {
    return this.http.get(GetAllAsset+category)
      .pipe(map(res => res));
  }

  public GetAllAssetStatusforDashBoard(category) {
    return this.http.get(GetAllAssetStatusforDashBoard + category)
      .pipe(map(res => res.json()));
  }


  public GetAssetStatusDetailsforDashboard(AssetId) {
    return this.http.get(GetAssetStatusDetailsDashboard + AssetId)
      .pipe(map(res => res.json()));
  }

  public GetPersonStatusDetailsforDashboard(AssetId) {
    return this.http.get(GetPersonStatusDetailsforDashboard + AssetId)
      .pipe(map(res => res.json()));
  }
  public GetPersonAttendanceDetailsforDashboard(AssetName) {
    return this.http.get( PeopleAttendance + AssetName)
      .pipe(map(res => res.json()));
  }
  public GetAssetHistory(AssetName) {
    return this.http.get(GetAssetHistory + AssetName)
      .pipe(map(res => res.json()));
  }

public GetTotalAssetStatus() {
  return this.http.get(GetTotalAssetStatus)
      .pipe(map(res => res.json()));
  }

  public GetAssetAlertHistory(AssetName) {
    return this.http.get(GetAssetAlertHistory + AssetName)
    .pipe(map(res => res.json()));
  }

  public GetHoldingAsset(AssetName) {
    return this.http.get(GetHoldingAsset+AssetName)
      .pipe(map(res => res.json()));
  }
  public releaseAsset(payload) {
    console.log('inside RELEASE ASSET');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(ReleaseAsset, payload)
      .pipe(map(result => result));
  }

  public geofenceCount() {
    return this.http.get('https://np1tfsqjw6.execute-api.ap-south-1.amazonaws.com/prod1/geofenceCount')
    .pipe(map(res => res.json()));
  }
  // ***********Abhishek's Service Ends Here******************
  async upload(fg: FormGroup) {
    const formData = new FormData();
    formData.append("sampleFile", fg.get('sampleFile').value);
    console.log(formData.get('sampleFile'));
    return this.http.post('/upload', formData).toPromise();
  }
}


