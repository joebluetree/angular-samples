import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsEditComponent } from './rights-edit.component';

describe('RightsEditComponent', () => {
  let component: RightsEditComponent;
  let fixture: ComponentFixture<RightsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightsEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RightsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
