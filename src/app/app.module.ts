/// <reference path="../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import {AppRoutingModule} from './app.routes';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


// Added By ABhishek
import { BLOB_STORAGE_TOKEN, IAzureStorage } from '../app/Components/administration/admin-sites/provision-asset/azure-storage/azureStorage';
import { BlobStorageService } from '../app/Components/administration/admin-sites/provision-asset/azure-storage/blob-storage.service';
import { AdministrationComponent } from './Components/administration/administration.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProvisionAssetComponent } from './Components/administration//admin-sites/provision-asset/provision-asset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetManagementComponent } from './Components/administration//admin-sites/asset-management/asset-management.component';
import { AssetService } from 'src/app/Services/asset.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GeofenceEditComponent } from './Components/administration/admin-sites/provision-asset/geofence-edit/geofence-edit.component';
import { AssetGeofenceListComponent } from './Components/administration/admin-sites/provision-asset/asset-geofence-list/asset-geofence-list.component';
import { MapService } from 'src/app/Services/map.service';
import { MapModule, MapAPILoader, BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, MapServiceFactory, BingMapServiceFactory } from 'angular-maps';
import { UserManagementComponent } from './Components/administration/admin-sites/user-management/user-management.component';
import {DemoMaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RestrictedGeofenceComponent } from './Components/administration/admin-sites/provision-asset/restricted-geofence/restricted-geofence.component';
import {  DashboardUtilizationComponent } from './Components/dashboard/dashboard-utilization/dashboard-utilization.component';
import { CommonModule } from '@angular/common';
import { TruncatePipeModule } from 'src/app/custom-pipes/truncatepipe.module';
import { SearchPipeModule } from 'src/app/custom-pipes/searchpipe.module';
import { SearchAccountPipeModule } from 'src/app/custom-pipes/searchAccountpipe.module';
import { SearchGeofencePipeModule } from 'src/app/custom-pipes/searchGeofencepipe.module';
import { CreateUserComponent } from './Components/administration/admin-sites/create-user/create-user.component';
import { ManageAccountsComponent } from './Components/administration/manage-accounts/manage-accounts.component'
import { AdminOverviewComponent } from './Components/administration/admin-overview/admin-overview.component';
import { GeofenceListComponent } from './Components/administration/admin-sites/geofence/geofence-list/geofence-list.component';
import { AssetGeofenceEditComponent } from './Components/administration/admin-sites/geofence/geofence-edit/geofence-edit.component';
import { AdminSitesComponent } from './Components/administration/admin-sites/admin-sites.component';
import { AdminManagementTableComponent } from './Components/administration//admin-sites/admin-management-table/admin-management-table.component';
import { AdminFacilityComponent } from './Components/administration/admin-sites/provision-asset/admin-facility/admin-facility.component';
import { DashboardSpecificAssetComponent } from './Components/dashboard/dashboard-specific-asset/dashboard-specific-asset.component';
import { TabWindowComponent } from './Components/dashboard/tab-window/tab-window.component';
import { AlertsTabComponent } from './Components/dashboard/alerts-tab/alerts-tab.component';
import { CurrentLocationTabComponent } from './Components/dashboard/current-location-tab/current-location-tab.component';
import { HistoryTabComponent } from './Components/dashboard/history-tab/history-tab.component';
import { UserNotesTabComponent } from './Components/dashboard/user-notes-tab/user-notes-tab.component';
import { FormGroup, FormControl, } from '@angular/forms'


// file uploader
import {FileUploadModule} from 'ng2-file-upload';

import { TrackerTableComponent } from './Components/administration/admin-sites/tracker-table/tracker-table.component';
import { TagTableComponent } from './Components/administration/admin-sites/tag-table/tag-table.component';
import { DashboardOverviewComponent } from './Components/dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardAssetsComponent } from './Components/dashboard/dashboard-assets/dashboard-assets.component';
import { DashboardOverviewFacilityComponent } from './Components/dashboard/dashboard-overview/dashboard-overview-facility/dashboard-overview-facility.component';
import { DashboardAssetsHeatmapComponent } from './Components/dashboard/dashboard-assets/dashboard-assets-heatmap/dashboard-assets-heatmap.component';
import { DashboardOverviewBingmapComponent } from './Components/dashboard/dashboard-overview/dashboard-overview-bingmap/dashboard-overview-bingmap.component';
import { UtilizationPieChartComponent } from './Components/dashboard/utilization-pie-chart/utilization-pie-chart.component';
import { AlertModalComponent } from './Components/dashboard/asset-modals/alert-modal/alert-modal.component';
import { HistoryModalComponent } from './Components/dashboard/asset-modals/history-modal/history-modal.component';
import { AdminSitesAssociateComponent } from './Components/administration/admin-sites/admin-sites-associate/admin-sites-associate.component';
import { CreateTagComponent } from './Components/administration/admin-sites/create-tag/create-tag.component';
import { CreateTrackerComponent } from './Components/administration/admin-sites/create-tracker/create-tracker.component';
import { EditDevicesComponent } from './Components/administration/admin-sites/edit-devices/edit-devices.component';
import { GeofenceUpdateComponent } from './Components/administration/admin-sites/geofence/geofence-update/geofence-update.component';
import { AssociateUserComponent } from './Components/administration/admin-sites/associate-user/associate-user.component';
import { GatewaysComponent } from './Components/administration/admin-sites/gateways/gateways.component';
import { CreateGatewaysComponent } from './Components/administration/admin-sites/create-gateways/create-gateways.component';
import { EditGatewayComponent } from './Components/administration/admin-sites/edit-gateway/edit-gateway.component';

import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DashboardOverviewPeopleComponent } from './Components/dashboard/dashboard-overview/dashboard-overview-people/dashboard-overview-people.component';
import { DashboardStatusContainerComponent } from './Components/dashboard/dashboard-status-container/dashboard-status-container.component';
import { DashboardPeopleSpecificComponent } from './Components/dashboard/dashboard-people-specific/dashboard-people-specific.component';
import { DashboardPeopleStatusComponent } from './Components/dashboard/dashboard-people-status/dashboard-people-status.component';
import { HoldingAssetsComponent } from './Components/dashboard/holding-assets/holding-assets.component';
import { MovementsComponent } from './Components/dashboard/movements/movements.component';
import { ReturnAssetsComponent } from './Components/dashboard/return-assets/return-assets.component';
import { PersonAssetManagementComponent } from './Components/administration/person-asset-management/person-asset-management.component';
import { EditAssetComponent } from './Components/administration/admin-sites/edit-asset/edit-asset.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

declare var AzureStorage: IAzureStorage;

@NgModule({
  declarations: [
    AppComponent,
    AdministrationComponent,
    DashboardComponent,
    ProvisionAssetComponent,
    AssetManagementComponent,
    GeofenceEditComponent,
    AssetGeofenceListComponent,
    UserManagementComponent,
    RestrictedGeofenceComponent,
    TruncatePipeModule,
    SearchPipeModule,
    SearchAccountPipeModule,
    SearchGeofencePipeModule,
    CreateUserComponent,
    ManageAccountsComponent,
    AdminOverviewComponent,
    GeofenceListComponent,
    AssetGeofenceEditComponent,
    AdminSitesComponent,
    AdminManagementTableComponent,
    AdminFacilityComponent,
    TrackerTableComponent,
    TagTableComponent,
    DashboardOverviewComponent,
    DashboardAssetsComponent,
    DashboardOverviewFacilityComponent,
    DashboardAssetsHeatmapComponent,
    DashboardSpecificAssetComponent,
    TabWindowComponent,
    AlertsTabComponent,
    CurrentLocationTabComponent,
    HistoryTabComponent,
    UserNotesTabComponent,
    DashboardOverviewBingmapComponent,
    UtilizationPieChartComponent,
    AlertModalComponent,
    HistoryModalComponent,
    AdminSitesAssociateComponent,
    CreateTagComponent,
    CreateTrackerComponent,
    DashboardUtilizationComponent,
    EditDevicesComponent,
    GeofenceUpdateComponent,
    AssociateUserComponent,
    GatewaysComponent,
    EditGatewayComponent,
    CreateGatewaysComponent,
    DashboardOverviewPeopleComponent,
    DashboardStatusContainerComponent,
    DashboardPeopleSpecificComponent,
    DashboardPeopleStatusComponent,
    HoldingAssetsComponent,
    MovementsComponent,
    ReturnAssetsComponent,
    PersonAssetManagementComponent,
    EditAssetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    DemoMaterialModule,
    MapModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    FileUploadModule,
    NgbModule,
    ProgressSpinnerModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AssetService,
    {provide: APP_BASE_HREF, useValue : '/' },
    {provide: MapAPILoader, deps: [], useFactory: MapServiceProviderFactory},
    BlobStorageService,
    {
      provide: BLOB_STORAGE_TOKEN,
      useValue: AzureStorage.Blob
    },
    // BlobStorageFacilityService,
    // {
    //   provide: BLOB_STORAGE_TOKEN_FACILITY,
    //   useValue: azureBlobStorageFactory
    // }
  ],
  bootstrap: [AppComponent],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
export function MapServiceProviderFactory() {
  const bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
  bc.apiKey = 'Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw'; // your bing map key
  bc.branch = 'experimental';
      // to use the experimental bing brach. There are some bug fixes for
      // clustering in that branch you will need if you want to use
      // clustering.
  return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
}
