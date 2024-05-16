import { Component, Input, inject } from '@angular/core';
import { vuelo } from '../vuelo';
import { RouterModule, RouterOutlet } from '@angular/router';
import { vueloServicio } from '../vuelo.service';
import { CommonModule, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vuelo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    NgForOf],
  templateUrl: './vuelo.component.html',
  styleUrl: './vuelo.component.css'
})
export class VueloComponent {

  @Input() vuelo!: vuelo;
  servicio = inject(vueloServicio);

  public deleteVuelo(){
    return this.servicio.deleteVuelo(this.vuelo.id).subscribe()
  }
}
