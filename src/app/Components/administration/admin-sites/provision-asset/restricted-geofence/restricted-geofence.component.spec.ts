import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedGeofenceComponent } from './restricted-geofence.component';

describe('RestrictedGeofenceComponent', () => {
  let component: RestrictedGeofenceComponent;
  let fixture: ComponentFixture<RestrictedGeofenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedGeofenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
