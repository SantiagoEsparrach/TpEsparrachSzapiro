import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { vueloServicio } from '../vuelo.service';

@Component({
  selector: 'app-agregar-vuelo',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,],
  templateUrl: './agregar-vuelo.component.html',
  styleUrl: './agregar-vuelo.component.css'
})
export class AgregarVueloComponent {

  servicioVuelos: vueloServicio = inject(vueloServicio);

  applyForm = new FormGroup({
    id: new FormControl(''),
    origen: new FormControl(''),
    destino: new FormControl(''),
    foto: new FormControl(''),
    asientosDisponibles: new FormControl(''),
    precio: new FormControl('')
  });

  public addVuelo(formData: any){
    const body = 
    {
      vuelos:{
        id: formData.id,
        origen: formData.origen,
        destino: formData.destino,
        foto: 'assets/images/'+formData.foto,
        asientosDisponibles: formData.asientosDisponibles,
        precio: formData.precio,
        pasajeros: [
              
        ]
      }
    }
    return this.servicioVuelos.addVuelo(body).subscribe(() => {
      //navigate
    })
  }

  public submitApplication(){
    const formData = this.applyForm.value;
    this.addVuelo(formData)
  }
}
