import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionAssetComponent } from './provision-asset.component';

describe('ProvisionAssetComponent', () => {
  let component: ProvisionAssetComponent;
  let fixture: ComponentFixture<ProvisionAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
