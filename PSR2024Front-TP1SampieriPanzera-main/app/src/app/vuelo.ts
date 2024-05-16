import { pasajero } from "./pasajero";

export interface vuelo {
    id: number;
    origen: string;
    destino: string;
    foto: string;
    asientosDisponibles: number;
    precio: number;
    pasajeros: pasajero[]
  }

export { pasajero };
  