import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSpecificAssetComponent } from './dashboard-specific-asset.component';

describe('DashboardSpecificAssetComponent', () => {
  let component: DashboardSpecificAssetComponent;
  let fixture: ComponentFixture<DashboardSpecificAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSpecificAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSpecificAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
