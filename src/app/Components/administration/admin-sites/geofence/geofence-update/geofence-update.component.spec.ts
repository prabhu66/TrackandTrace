import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceUpdateComponent } from './geofence-update.component';

describe('GeofenceUpdateComponent', () => {
  let component: GeofenceUpdateComponent;
  let fixture: ComponentFixture<GeofenceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
