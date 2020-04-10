import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverviewFacilityComponent } from './dashboard-overview-facility.component';

describe('DashboardOverviewFacilityComponent', () => {
  let component: DashboardOverviewFacilityComponent;
  let fixture: ComponentFixture<DashboardOverviewFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOverviewFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOverviewFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
