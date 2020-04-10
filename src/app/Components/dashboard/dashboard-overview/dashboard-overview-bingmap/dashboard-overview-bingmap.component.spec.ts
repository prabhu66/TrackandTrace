import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverviewBingmapComponent } from './dashboard-overview-bingmap.component';

describe('DashboardOverviewBingmapComponent', () => {
  let component: DashboardOverviewBingmapComponent;
  let fixture: ComponentFixture<DashboardOverviewBingmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOverviewBingmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOverviewBingmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
