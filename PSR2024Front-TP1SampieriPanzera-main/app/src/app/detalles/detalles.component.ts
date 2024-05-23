import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { pasajero, vuelo } from '../vuelo';
import { vueloServicio } from '../vuelo.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PasajeroService } from '../pasajero.service';
import { NgForOf } from '@angular/common';





@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    NgForOf
  ],
  templateUrl: "./detalles.component.html",
  styleUrls: ['./detalles.component.css'],
})
export class DetalleComponent {

  pasajeroSeleccionado: string|undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  servicio = inject(vueloServicio);
  servicioPasajeros = inject(PasajeroService);
  vuelo: vuelo| any;

  resultados: pasajero[]| any = []

  applyForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl('')
  });

  constructor() {

    const idVuelo = parseInt(this.route.snapshot.params['id'], 10);
    this.servicio.getOneVuelo(idVuelo).subscribe((data:any) => {
      this.vuelo = data.vuelos
      if(this.vuelo){
        this.servicioPasajeros.getAllPasajero(this.vuelo?.id).subscribe((data: any) =>{
          if (data && data.pasajeros && Array.isArray(data.pasajeros)) {
            this.resultados = data.pasajeros          
        }})
      }
    })
    
  }

  public deletePasajero(idVuelo: number, mailPasajero: string | undefined){
    return this.servicioPasajeros.deletePasajero(idVuelo, mailPasajero).subscribe()
  }

  public addPasajero(idVuelo: number, formData: any){
    const body = {
      pasajeros: {
        mail: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni
      }
    };
    return this.servicioPasajeros.addPasajero(idVuelo, body).subscribe()
  }

  submitApplication() {
    const formData = this.applyForm.value;
    const idVuelo= this.vuelo.id;
    this.addPasajero(idVuelo, formData)
  }

}