import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssetsHeatmapComponent } from './dashboard-assets-heatmap.component';

describe('DashboardAssetsHeatmapComponent', () => {
  let component: DashboardAssetsHeatmapComponent;
  let fixture: ComponentFixture<DashboardAssetsHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAssetsHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssetsHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
