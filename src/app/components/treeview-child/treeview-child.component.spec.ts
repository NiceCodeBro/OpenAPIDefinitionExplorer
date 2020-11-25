import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewChildComponent } from './treeview-child.component';

describe('TreeViewChildComponent', () => {
  let component: TreeViewChildComponent;
  let fixture: ComponentFixture<TreeViewChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
