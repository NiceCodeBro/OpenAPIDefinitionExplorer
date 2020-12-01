import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowComponent } from './arrow.component';

describe('ArrowComponent', () => {
  let component: ArrowComponent;
  let fixture: ComponentFixture<ArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed @Input value isExpanded = true', () => {
    component.isExpanded = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.firstChild.className).toBe('arrow collapsedArrow');
  });

  it('should correctly render the passed @Input value isExpanded = false', () => {
    component.isExpanded = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.firstChild.className).toBe('arrow expandedArrow');
  });
});
