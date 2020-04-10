import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetGeofenceListComponent } from './asset-geofence-list.component';

describe('AssetGeofenceListComponent', () => {
  let component: AssetGeofenceListComponent;
  let fixture: ComponentFixture<AssetGeofenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetGeofenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetGeofenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
