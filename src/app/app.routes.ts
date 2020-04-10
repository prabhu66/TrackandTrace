import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AdministrationComponent } from './Components/administration/administration.component';
import { ProvisionAssetComponent } from './Components/administration/admin-sites/provision-asset/provision-asset.component';
import { AssetManagementComponent } from './Components/administration/admin-sites/asset-management/asset-management.component';
import { AssetGeofenceListComponent } from './Components/administration/admin-sites/provision-asset/asset-geofence-list/asset-geofence-list.component';
import { UserManagementComponent } from './Components/administration/admin-sites/user-management/user-management.component';
import { AdminOverviewComponent } from './Components/administration//admin-overview/admin-overview.component';
import { ManageAccountsComponent } from './Components/administration/manage-accounts/manage-accounts.component';
import { AdminFacilityComponent } from './Components/administration/admin-sites/provision-asset/admin-facility/admin-facility.component'
import { AdminManagementTableComponent } from './Components/administration//admin-sites/admin-management-table/admin-management-table.component';
import { GeofenceListComponent } from './Components/administration/admin-sites/geofence/geofence-list/geofence-list.component';
import { AssetGeofenceEditComponent } from './Components/administration/admin-sites/geofence/geofence-edit/geofence-edit.component';
import { AdminSitesComponent } from './Components/administration/admin-sites/admin-sites.component';
import { TrackerTableComponent } from './Components/administration/admin-sites/tracker-table/tracker-table.component';
import { TagTableComponent } from './Components/administration/admin-sites/tag-table/tag-table.component';
import { DashboardOverviewComponent } from './Components/dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardAssetsComponent } from './Components/dashboard/dashboard-assets/dashboard-assets.component';
import { DashboardSpecificAssetComponent } from './Components/dashboard/dashboard-specific-asset/dashboard-specific-asset.component';
import { DashboardOverviewFacilityComponent } from './Components/dashboard/dashboard-overview/dashboard-overview-facility/dashboard-overview-facility.component';
import { AdminSitesAssociateComponent } from './Components/administration/admin-sites/admin-sites-associate/admin-sites-associate.component';
import { CreateUserComponent } from './Components/administration/admin-sites/create-user/create-user.component';
import { CreateTagComponent } from './Components/administration/admin-sites/create-tag/create-tag.component';
import { CreateTrackerComponent } from './Components/administration/admin-sites/create-tracker/create-tracker.component';
import { EditDevicesComponent } from './Components/administration/admin-sites/edit-devices/edit-devices.component';
import { AssociateUserComponent } from './Components/administration/admin-sites/associate-user/associate-user.component';
import { GatewaysComponent } from './Components/administration/admin-sites/gateways/gateways.component';
import { CreateGatewaysComponent } from './Components/administration/admin-sites/create-gateways/create-gateways.component';
import { DashboardStatusContainerComponent } from './Components/dashboard/dashboard-status-container/dashboard-status-container.component';
import { DashboardPeopleSpecificComponent } from './Components/dashboard/dashboard-people-specific/dashboard-people-specific.component';
import { EditAssetComponent } from './Components/administration/admin-sites/edit-asset/edit-asset.component';


const routes: Routes = [
    {
        path: '',
        component: AdminSitesComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
        
            {
                path: 'overview',
                component: DashboardOverviewComponent,
            },
            {
                path: '',
                component: DashboardOverviewComponent,
            },
            {
                path: 'assets',
                component: DashboardStatusContainerComponent,
            },
            {
                path: 'specific-asset',
                component: DashboardSpecificAssetComponent,
            },
            {
                path: 'dashboard-facility',
                component: DashboardOverviewFacilityComponent,
            },
            {
                path:'people-specific',
                component:DashboardPeopleSpecificComponent,
            }
            ]

    },
    {
        path: 'admin',
        component: AdministrationComponent,
        children: [
            {
                path: 'overview',
                component: AdminOverviewComponent,
            },
            {
                path: '',
                component: AdminOverviewComponent,
            },
            {
                path: 'sites',
                component: AdminSitesComponent,
                children: [
                    {
                        path: '',
                        component: AssetManagementComponent
                    },
                    {
                        path: 'Facility',
                        component: AdminFacilityComponent
                    },
                    {

                        path: 'Geofences',
                        component: GeofenceListComponent,
                    },
                     {

                        path: 'editGeofences',
                        component: AssetGeofenceEditComponent,
                    },

                    {
                        path: 'Trackers',
                        component: TrackerTableComponent,
                    },
                    {
                        path: 'Tags',
                        component: TagTableComponent,
                    },
                     {
                        path: 'Gateways',
                        component: GatewaysComponent,
                    },
                    {
                        path: 'AssetManagement',
                        component: AssetManagementComponent,
                    },
                    {
                        path:'EditAsset',
                        component:EditAssetComponent,
                    },
                    {
                        path: 'UserManagement',
                        component: UserManagementComponent,
                      
                    },
                     {
                          path:'createGateway',
                          component:CreateGatewaysComponent,
                    },
                     {
                          path:'createTracker',
                          component:CreateTrackerComponent,
                    },
                     {
                          path:'createTag',
                          component:CreateTagComponent,
                    },
                     {
                          path:'createUser',
                          component:CreateUserComponent,
                    },
                    {
                        path:'editDevice/:id',
                        component:EditDevicesComponent,
                    },
                    {
                        path: 'ProvisioningAsset',
                        component: ProvisionAssetComponent,
                        children:[{path:'Facility', component:AdminFacilityComponent}]
                    },
                    {
                        path: 'assetList',
                        component: AssetGeofenceListComponent
                    },
                    {
                        path: 'AssetTable',
                        component: AdminManagementTableComponent
                    },
                    {
                        path: 'Associate/:id',
                        component: AssociateUserComponent
                    }
                ],

            },
            {
                path: 'account',
                component: ManageAccountsComponent,
            },]
    }]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }