import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFormComponentComponent } from './reserva-form.component';

describe('ReservaFormComponentComponent', () => {
  let component: ReservaFormComponentComponent;
  let fixture: ComponentFixture<ReservaFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
