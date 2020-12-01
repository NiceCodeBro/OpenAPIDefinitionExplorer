/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeViewComponent } from './treeview.component';
import { IProperty, PropertyTypes } from '../../models/model';
import { By } from '@angular/platform-browser';

describe('TreeViewComponent', () => {
  let component: TreeViewComponent;
  let fixture: ComponentFixture<TreeViewComponent>;

  const fakeProperty: IProperty = {
    name: 'y',
    type: PropertyTypes.OBJECT,
    properties: {
      timestamp: {
        description:
          'Relative timestamp in Milliseconds. If device is having ...ince startup of device.',
        format: 'int64',
        type: 'integer'
      },
      value: {
        format: 'double',
        type: 'number'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewComponent);
    component = fixture.componentInstance;
    component.prop = fakeProperty;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have x number of children component which depends on own input prop', () => {
    component.isExpanded = true;
    fixture.detectChanges();
    const titelChildElementCount = fixture.debugElement.query(
      By.css('.treeview-titel')
    ).nativeNode.childElementCount;
    expect(titelChildElementCount).toBe(1);

    const propertiesChildElementCount = fixture.debugElement.query(
      By.css('.treeview-properties')
    ).nativeNode.childElementCount;
    expect(propertiesChildElementCount).toBe(
      Object.keys(fakeProperty.properties).length * 2
    ); // 2* -> because of double for loop in treeview
  });
});
