import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSearchComponent } from './param-search.component';

describe('ModuleSearchComponent', () => {
  let component: ModuleSearchComponent;
  let fixture: ComponentFixture<ModuleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModuleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
