import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { vueloServicio } from '../vuelo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-vuelo',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,],
  templateUrl: './modificar-vuelo.component.html',
  styleUrl: './modificar-vuelo.component.css'
})
export class ModificarVueloComponent {
  servicioVuelos: vueloServicio = inject(vueloServicio);

  route: ActivatedRoute = inject(ActivatedRoute);

  applyForm = new FormGroup({
    id: new FormControl(''),
    origen: new FormControl(''),
    destino: new FormControl(''),
    foto: new FormControl(''),
    asientosDisponibles: new FormControl(''),
    precio: new FormControl('')
  });

  public modificarVuelo(id:number, formData: any){
    const body = 
    {
      vuelos:{
        id: id,
        origen: formData.origen,
        destino: formData.destino,
        foto: 'assets/images/'+formData.foto,
        asientosDisponibles: formData.asientosDisponibles,
        precio: formData.precio,
        pasajeros: [
              
        ]
      }
    }
    return this.servicioVuelos.modificarVuelo(id, body).subscribe()
  }

  public submitApplication(){
    const id = parseInt(this.route.snapshot.params['id'], 10);
    console.log(id)
    const formData = this.applyForm.value;
    this.modificarVuelo(id, formData)
  }
}
