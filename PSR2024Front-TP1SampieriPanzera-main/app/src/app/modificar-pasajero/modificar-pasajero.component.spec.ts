import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPasajeroComponent } from './modificar-pasajero.component';

describe('ModificarPasajeroComponent', () => {
  let component: ModificarPasajeroComponent;
  let fixture: ComponentFixture<ModificarPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPasajeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
