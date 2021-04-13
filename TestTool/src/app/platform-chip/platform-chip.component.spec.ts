import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformChipComponent } from './platform-chip.component';

describe('PlatformChipComponent', () => {
  let component: PlatformChipComponent;
  let fixture: ComponentFixture<PlatformChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
