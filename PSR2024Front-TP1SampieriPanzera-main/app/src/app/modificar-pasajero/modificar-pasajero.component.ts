import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasajeroService } from '../pasajero.service';

@Component({
  selector: 'app-modificar-pasajero',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,],
  templateUrl: './modificar-pasajero.component.html',
  styleUrl: './modificar-pasajero.component.css'
})
export class ModificarPasajeroComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  servicioPasajeros = inject(PasajeroService);

  applyForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl('')
  });

  public modificarPasajero(idVuelo: number, mail: string, formData: any){
    const body = {
      pasajeros: {
        mail: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido
      }
    };
    return this.servicioPasajeros.modificarPasajero(idVuelo, mail, body).subscribe()
  }

  submitApplication() {
    const formData = this.applyForm.value;
    console.log(formData)
    const mailPasajero = this.route.snapshot.params['mailPasajero'];
    const idVuelo = this.route.snapshot.params['idVuelo'];
    this.modificarPasajero(idVuelo, mailPasajero, formData)
  }
}
