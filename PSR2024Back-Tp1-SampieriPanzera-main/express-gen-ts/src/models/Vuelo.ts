import moment from 'moment';
import { IPasajero } from './Pasajero';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IVuelo {
    id: number;
    origen: string;
    destino: string;
    foto: string;
    asientosDisponibles: number;
    precio: number;
    pasajeros: IPasajero[]
  }


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    id?: number,
    origen?: string,
    destino?: string,
    foto?: string,
    asientosDisponibles?: number,
    precio?: number,
    pasajeros?: IPasajero[],
): IVuelo {
  return {
    id: (id ?? -1),
    origen: (origen ?? ''),
    destino: (destino ?? ''),
    foto: (foto ?? ''),
    asientosDisponibles: (asientosDisponibles ?? 0),
    precio: (precio ?? 0),
    pasajeros: (pasajeros ?? []),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IVuelo {
  if (!isVuelo(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IVuelo;
  return new_(p.id, p.origen, p.destino, p.foto, p.asientosDisponibles, p.precio, p.pasajeros);
}

/**
 * See if the param meets criteria to be a user.
 */
function isVuelo(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'origen' in arg && typeof arg.origen === 'string' && 
    'destino' in arg && typeof arg.destino === 'string' &&
    'foto' in arg && typeof arg.foto === 'string' &&
    'asientosDisponibles' in arg && typeof arg.asientosDisponibles === 'string' &&
    'precio' in arg && typeof arg.precio === 'string' &&
    'pasajeros' in arg && Array.isArray(arg.pasajeros)
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isVuelo,
} as const;
