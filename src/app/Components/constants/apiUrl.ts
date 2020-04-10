import {technoRoot} from './ApiRootConst';
import {AWSRootURL} from './AWSApiUrl';
import { IBMRootURL } from './IBMApiUrl';
let getFacilityList = IBMRootURL+'GetFacilityList';
let GetAllAccounts = technoRoot +"GetAllAccounts";
let GetZonebyFacility = IBMRootURL+"GetZonesforFacility?FacilityName=";

let GetAllAsset =IBMRootURL+"GetAllAsset?Category="; 
let getDeviceList =IBMRootURL+"GetDeviceList"

let GetZoneAssetDetails =IBMRootURL+"GetZoneAssetDetails?"

let CreateAsset = IBMRootURL+"CreateAsset";
let CreateGeofence="https://eu-gb.functions.cloud.ibm.com/api/v1/web/aadya.pant%40wipro.com_dev/cloudant-events/createGeofence";
let GetGeofenceList="https://eu-gb.functions.cloud.ibm.com/api/v1/web/aadya.pant%40wipro.com_dev/cloudant-events/geofenceList";
// let GetGeofenceName=AWSRootURL+"geofenceList?param=geofenceNameList";
let GetMapDetails=IBMRootURL+"GetOutdoorAssetListforMap";


let CreateFacility = IBMRootURL +"AddFacility";
let CreateDevices = IBMRootURL +"CreateDevice";
let GetTagLists = "https://eu-gb.functions.cloud.ibm.com/api/v1/web/aadya.pant%40wipro.com_dev/default/getDeviceList?deviceType=BLE";
let GetTrackerLists =IBMRootURL +"getDeviceList?deviceType=TRACKER";
let DeleteDevices =IBMRootURL +"DeleteDevice";
let DeleteGeofence = "https://eu-gb.functions.cloud.ibm.com/api/v1/web/aadya.pant%40wipro.com_dev/cloudant-events/geofenceDelete";
let GetAllFacilityInfo = IBMRootURL+"GetFacilityZoneList";
let EditDevices =IBMRootURL+"EditDevice";
let DeleteFacility = IBMRootURL+'DeleteFacility?FacilityId=';
let ImageUpload = '/imgUpload';
let GetUtilizationData=IBMRootURL+"AssetUtilizationSummary?deviceType=";
let GetUtilizationDataPeople = "https://eu-gb.functions.cloud.ibm.com/api/v1/web/aadya.pant%40wipro.com_dev/default/AssetUtilizationSummaryPeople";
let AssociateAssetUser = IBMRootURL+'CreateUserAssetAssociation';
let GetAllUsers = IBMRootURL +'UserList';
let UpdateFacility = IBMRootURL +'UpdateFacility';
let CreateUser = IBMRootURL +'CreateUserTnT';
let DeleteUser = IBMRootURL+'DeleteUser?ID=';
let GetUserList = IBMRootURL+'UserList';

let GetAllAssetsInFacilities=AWSRootURL + "GetAllAssetsforFloorMap?Category="
let GetAllAssetsInFacilitiesMaterial =IBMRootURL +"GetAllAssetsForFloorMapMaterial"

const GetAllAssetStatusforDashBoard=IBMRootURL+"GetAllAssetStatusForDashboard?AssetCategory=";
let DeleteAsset = IBMRootURL+"DeleteAsset";
let GetGatewayList ="https://eu-gb.functions.cloud.ibm.com/api/v1/web/aadya.pant%40wipro.com_dev/default/GatewayList1?name=Gateway";
let DeleteGateway=IBMRootURL+"DeleteGateway";
let GetAllGateways=IBMRootURL+"gatewayList?name=GATEWAY";
let CreateGateway=IBMRootURL+"CreateGateway1";
let PeopleAttendance=AWSRootURL+"GetAttendanceGraph?Person=";
let GetAssetStatusDetailsDashboard= IBMRootURL+"GetAssetStatusDetailsforDashboard?AssetId=";
let GetPersonStatusDetailsforDashboard=IBMRootURL+'GetPersonDetails?AssetID=';
let GetAssetHistory=IBMRootURL+'GetAssetHistory?AssetName=';
let GetTotalAssetStatus=IBMRootURL+'GetTotalAssetStatus?';
let GetAssetAlertHistory=IBMRootURL+'GetAssetAlertHistory?AssetName=';
let GetHoldingAsset=IBMRootURL+'GetHoldingAssetList?Worker=';
let ReleaseAsset=IBMRootURL+'ReleaseAsset';
let UploadImage="https://iesibmprojects.us-south.cf.appdomain.cloud/upload";
let FetchImage="https://iesibmprojects.us-south.cf.appdomain.cloud/api/buketdata";

export {CreateFacility,
        GetGatewayList,
        GetAllAssetsInFacilities, 
        GetAllAssetStatusforDashBoard, 
        GetAllUsers,
        GetUtilizationData, 
        AssociateAssetUser,
        GetAllFacilityInfo,
        getFacilityList, 
        GetAllAccounts, 
        GetZonebyFacility,
        UpdateFacility, 
        CreateAsset, 
        GetAllAsset,
        GetZoneAssetDetails,
        CreateGeofence,
        GetGeofenceList,
        // GetGeofenceName,
        GetMapDetails,
        CreateDevices,
        GetTagLists,
        GetTrackerLists,
        DeleteDevices,
        DeleteGeofence,
        EditDevices,
        DeleteFacility,
        CreateUser,
        DeleteUser,
        GetUserList,
        DeleteAsset,
        GetAllGateways,
        CreateGateway,
        DeleteGateway,
        PeopleAttendance,
        GetAssetStatusDetailsDashboard,
        GetPersonStatusDetailsforDashboard,
        GetAssetHistory,
        GetTotalAssetStatus,
        GetAssetAlertHistory,
        GetHoldingAsset,
        ReleaseAsset,
        GetAllAssetsInFacilitiesMaterial,
        GetUtilizationDataPeople,
        getDeviceList,
        UploadImage,
        FetchImage,
        ImageUpload
};




