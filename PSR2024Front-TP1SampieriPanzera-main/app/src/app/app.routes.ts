import { Routes } from '@angular/router';
import { DetalleComponent } from './detalles/detalles.component';
import { InicioComponent } from './inicio/inicio.component';
import { ModificarVueloComponent } from './modificar-vuelo/modificar-vuelo.component';
import { ModificarPasajeroComponent } from './modificar-pasajero/modificar-pasajero.component';
import { AgregarVueloComponent } from './agregar-vuelo/agregar-vuelo.component';

export const routes: Routes = [{
    path:"detalle/:id",
    component: DetalleComponent
},
{
    path:"modificarVuelo/:id",
    component: ModificarVueloComponent
},
{
    path:"modificarPasajero/:idVuelo/:mailPasajero",
    component: ModificarPasajeroComponent
},
{
    path:'',
    component: InicioComponent
},
{
    path: "agregarVuelo",
    component: AgregarVueloComponent
}
];
