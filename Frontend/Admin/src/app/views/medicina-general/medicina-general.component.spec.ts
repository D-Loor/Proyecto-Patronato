import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaGeneralComponent } from './medicina-general.component';

describe('MedicinaGeneralComponent', () => {
  let component: MedicinaGeneralComponent;
  let fixture: ComponentFixture<MedicinaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
