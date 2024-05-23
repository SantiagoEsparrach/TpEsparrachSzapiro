import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IPasajero {
    mail: string;
    nombre: string;
    apellido: string;
    dni: number;
}
  


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
    mail?: string,
    nombre?: string,
    apellido?: string,
    dni?: number,
): IPasajero {
  return {
    mail: (mail ?? ''),
    nombre: (nombre ?? ''),
    apellido: (apellido ?? ''),
    dni: (dni ?? 0),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IPasajero {
  if (!isPasajero(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPasajero;
  return new_(p.mail, p.nombre, p.apellido, p.dni);
}

/**
 * See if the param meets criteria to be a user.
 */
function isPasajero(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'mail' in arg && typeof arg.mail === 'string' && 
    'nombre' in arg && typeof arg.nombre === 'string' && 
    'apellido' in arg && typeof arg.apellido === 'string' && 
    'dni' in arg && typeof arg.dni === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isPasajero,
} as const;
