/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Aeropuerto: {
    Base: '/',
    AddVuelo: '/vuelo',
    GetAllVuelos: '/vuelo',
    GetVuelo: '/vuelo/:id',
    AddPasajero: '/vuelo/:id/pasajero',
    GetAllPasajero: '/vuelo/:id/pasajero',
    GetPasajero: '/vuelo/:vueloid/pasajero/:pasajeroid',
    UpdateVuelo: '/vuelo/:id',
    UpdatePasajero: '/vuelo/:vueloid/pasajero/:pasajeroid',
    DeleteVuelo: '/vuelo/:id',
    DeletePasajero: '/vuelo/:vueloid/pasajero/:pasajeroid',
  },
} as const;
