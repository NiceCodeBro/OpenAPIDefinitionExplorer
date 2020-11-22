import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointPropertiesComponent } from './endpoint-properties.component';

describe('EndpointPropertiesComponent', () => {
  let component: EndpointPropertiesComponent;
  let fixture: ComponentFixture<EndpointPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
