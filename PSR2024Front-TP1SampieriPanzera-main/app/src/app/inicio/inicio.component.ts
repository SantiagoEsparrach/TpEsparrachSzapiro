import { Component, inject } from '@angular/core';
import { VueloComponent } from '../vuelo/vuelo.component';
import { vueloServicio } from '../vuelo.service';
import { vuelo } from '../vuelo';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,VueloComponent, RouterModule, RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  listaVuelos: vuelo[] = [];
  servicio: vueloServicio = inject(vueloServicio);
  resultados: vuelo[] = [];
  constructor() {
    this.servicio.getAllVuelos().subscribe((data: any) => {
      if (data && data.vuelos && Array.isArray(data.vuelos)) {
        this.listaVuelos= data.vuelos
        this.resultados=this.listaVuelos;
      }
    });
  }
  
  
  filtrarResultados(text: string) {
    if (!text) {
      this.resultados = this.listaVuelos;
      return;
    }
    this.resultados = this.listaVuelos.filter(
      vueloActual => vueloActual?.destino.toLowerCase().includes(text.toLowerCase())
    );
  }
  onSubmit(e: { preventDefault: () => void; }, texto:string){
    if (e) e.preventDefault();
    this.filtrarResultados(texto);
  }

}

