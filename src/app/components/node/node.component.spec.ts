import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeComponent } from './node.component';
import { IProperty, PropertyTypes } from '../../models/model';

describe('NodeComponent', () => {
  let component: NodeComponent;
  let fixture: ComponentFixture<NodeComponent>;
  let fakeProperty : IProperty = {
    description: "Relative timestamp in Milliseconds. If device is having a RT.",
    name: "timestamp",
    type: PropertyTypes.INTEGER,
  }

  let fakeProperty2 : IProperty = {
    description: "Relative timestamp in Milliseconds. If device is having a RT.",
    name: "timestamp",
    type: PropertyTypes.INTEGER
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeComponent);

    component = fixture.componentInstance;
    component.prop = fakeProperty;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has unique component id', () => {
    let anotherComponent = TestBed.createComponent(NodeComponent);
    anotherComponent.componentInstance.prop = fakeProperty2;
    expect(anotherComponent.componentInstance.componentId).not.toBe(component.componentId);
  });
});
