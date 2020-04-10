let getFacilityList = 'https://aramarkapi.azurewebsites.net/api/GetFacilityList';
let GetAllAccounts = "https://aramarkapi.azurewebsites.net/api/GetAllAccounts";
let GetZonebyFacility = "https://aramarkapi.azurewebsites.net/api/GetZonesforFacility?FacilityName=";
// let GetAllAssets = "https://trackntraceapiapps.azurewebsites.net/api/GetAllAssets";
let GetAllAssets ="https://aramarkapi.azurewebsites.net/api/GetAllAssets?Category=";
// let GetZoneAssetDetails = "https://trackntraceapiapps.azurewebsites.net/api/GetZoneAssetDetails?"
let GetZoneAssetDetails ="https://aramarkapi.azurewebsites.net/api/GetZoneAssetDetails?"
// let CreateAsset = "https://trackntraceapiapps.azurewebsites.net/api/CreateAsset";
let CreateAsset = "https://aramarkapi.azurewebsites.net/api/CreateAsset";
let CreateGeofence="https://trackandtracefuncapp.azurewebsites.net/api/createGeofence";
let GetGeofenceList="https://trackandtracefuncapp.azurewebsites.net/api/geofenceList?param=rawGeofenceList";
let GetGeofenceName="https://trackandtracefuncapp.azurewebsites.net/api/geofenceList?param=geofenceNameList";
let GetMapDetails="https://aramarkapi.azurewebsites.net/api/GetOutdoorAssetListforMap";
let CreateFacility = "https://aramarkapi.azurewebsites.net/api/AddFacility";
let CreateDevices = " https://aramarkadminapi.azurewebsites.net/api/createDevices";
let GetTagLists = "https://aramarkapi.azurewebsites.net/api/GetDeviceList?param=BLE";
let GetTrackerLists = "https://aramarkapi.azurewebsites.net/api/GetDeviceList?param=Tracker";
let DeleteDevices = " https://aramarkadminapi.azurewebsites.net/api/deleteDevice";
let DeleteGeofence = "https://trackandtracefuncapp.azurewebsites.net/api/geofenceDelete";
let GetAllFacilityInfo = "https://aramarkapi.azurewebsites.net/api/GetFacilityZoneList";
let EditDevices = " https://aramarkadminapi.azurewebsites.net/api/editDevice ";
let DeleteFacility = 'https://aramarkapi.azurewebsites.net/api/DeleteFacility?FacilityId=';
// let GetUtilizationData = 'https://trackntraceapiapps.azurewebsites.net/api/AssetUtilizationSummary';
let GetUtilizationData="  https://aramarkapi.azurewebsites.net/api/AssetUtilizationSummary?Category="
let AssociateAssetUser = ' https://aramarkadminapi.azurewebsites.net/api/creatUserAssetAssociation';
let GetAllUsers = ' https://aramarkadminapi.azurewebsites.net/api/userList?param=userList';
let UpdateFacility = 'https://aramarkapi.azurewebsites.net/api/UpdateFacility';
let CreateUser = ' https://aramarkadminapi.azurewebsites.net/api/createUser ';
let DeleteUser = ' https://aramarkadminapi.azurewebsites.net/api/deleteUser';
let GetUserList = ' https://aramarkadminapi.azurewebsites.net/api/userList?param=userList';
// let GetAllAssetsInFacilities = 'https://trackntraceapiapps.azurewebsites.net/api/GetAllAssetsforFloorMap';
let GetAllAssetsInFacilities= "https://aramarkapi.azurewebsites.net/api/GetAllAssetsforFloorMap?Category="
// const GetAllAssetStatusforDashBoard = 'https://trackntraceapiapps.azurewebsites.net/api/GetAllAssetStatusforDashBoard';
const GetAllAssetStatusforDashBoard="https://aramarkapi.azurewebsites.net/api/GetAllAssetStatusforDashBoard?Category=";
let DeleteAsset ="https://aramarkadminapi.azurewebsites.net/api/deleteAsset";
let GetGatewayList ="https://aramarkadminapi.azurewebsites.net/api/gatewayList?param=GATEWAY";
let DeleteGateway="https://aramarkadminapi.azurewebsites.net/api/deleteGateway";
let GetAllGateways="https://aramarkadminapi.azurewebsites.net/api/gatewayList?param=GATEWAY";
let CreateGateway="https://aramarkadminapi.azurewebsites.net/api/createGateway";
let PeopleAttendance="https://aramarkapi.azurewebsites.net/api/GetAttendanceGraph?Person=";
let GetAssetStatusDetailsDashboard="https://aramarkapi.azurewebsites.net/api/GetAssetStatusDetailsforDashboard?AssetId=";
let GetPersonStatusDetailsforDashboard='https://aramarkapi.azurewebsites.net/api/GetPersonDetails?AssetId=';
let GetAssetHistory='https://aramarkapi.azurewebsites.net/api/GetAssetHistory?AssetName=';
let GetTotalAssetStatus='https://aramarkapi.azurewebsites.net/api/GetTotalAssetStatus';
let GetAssetAlertHistory='https://aramarkapi.azurewebsites.net/api/GetAssetAlertHistory?AssetName=';
let GetHoldingAsset='https://aramarkapi.azurewebsites.net/api/GetHoldingAssetList?Worker=';
let ReleaseAsset='https://aramarkadminapi.azurewebsites.net/api/releaseAsset';

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
        GetAllAssets,
        GetZoneAssetDetails,
        CreateGeofence,
        GetGeofenceList,
        GetGeofenceName,
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
        ReleaseAsset};





