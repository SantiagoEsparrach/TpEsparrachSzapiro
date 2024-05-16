import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Vuelo from '@src/models/Vuelo';
import Pasajero from '@src/models/Pasajero';
import VueloRoutes from './VueloRoutes';



// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add vueloRouter ** //

const vueloRouter = Router();

vueloRouter.get(
  Paths.Aeropuerto.GetAllVuelos,
  VueloRoutes.getAllVuelos,
);

vueloRouter.get(
  Paths.Aeropuerto.GetVuelo,
  VueloRoutes.getOneVuelo,
);

vueloRouter.get(
  Paths.Aeropuerto.GetAllPasajero,
  VueloRoutes.getAllPasajeros,
);

vueloRouter.get(
  Paths.Aeropuerto.GetPasajero,
  VueloRoutes.getOnePasajero,
);

vueloRouter.post(
  Paths.Aeropuerto.AddVuelo,
  VueloRoutes.addVuelo,
);

vueloRouter.post(
  Paths.Aeropuerto.AddPasajero,
  VueloRoutes.addPasajero,
);

vueloRouter.put(
  Paths.Aeropuerto.UpdateVuelo,
  VueloRoutes.updateVuelo,
);

vueloRouter.put(
  Paths.Aeropuerto.UpdatePasajero,
  VueloRoutes.updatePasajero,
);

vueloRouter.delete(
  Paths.Aeropuerto.DeleteVuelo,
  VueloRoutes.deleteVuelo,
);

vueloRouter.delete(
  Paths.Aeropuerto.DeletePasajero,
  VueloRoutes.deletePasajero,
);

// Add vueloRouter
apiRouter.use(Paths.Aeropuerto.Base, vueloRouter);



// **** Export default **** //

export default apiRouter;
