import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import { IVuelo } from '@src/models/Vuelo';
import { IPasajero } from '@src/models/Pasajero';
import VueloService from '@src/services/VueloService';



// **** Functions **** //


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
/**
 * Get all users.
 */

async function getAllVuelos(_: IReq, res: IRes) {
  const vuelos = await VueloService.getAllVuelos();
  return res.status(HttpStatusCodes.OK).json({ vuelos });
}

async function getOneVuelo(req: IReq, res: IRes) {
  const id = +req.params.id;
  const vuelos = await VueloService.getOneVuelo(id);
  return res.status(HttpStatusCodes.OK).json({ vuelos });
}

async function getAllPasajeros(req: IReq, res: IRes) {
  const id = +req.params.id;
  const pasajeros = await VueloService.getAllPasajeros(id);
  return res.status(HttpStatusCodes.OK).json({ pasajeros });
}

async function getOnePasajero(req: IReq, res: IRes) {
  const vueloId = +req.params.vueloid; 
  const mailPasajero = req.params.pasajeroid;
  const pasajero = await VueloService.getOnePasajero(vueloId, mailPasajero);
  return res.status(HttpStatusCodes.OK).json({ pasajero });
}

/**
 * Add one user.
 */
async function addVuelo(req: IReq<{vuelos: IVuelo}>, res: IRes) {
  const { vuelos } = req.body;
  console.log(vuelos);
  await VueloService.addVuelo(vuelos);
  return res.status(HttpStatusCodes.CREATED).end();
}

async function addPasajero(req: IReq<{pasajeros: IPasajero}>, res: IRes) {
  const id = +req.params.id;
  const { pasajeros } = req.body;
  console.log(id);
  console.log(pasajeros);
  await VueloService.addPasajero(id, pasajeros);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function updateVuelo(req: IReq<{vuelos: IVuelo}>, res: IRes) {
  const { vuelos } = req.body;
  await VueloService.updateVuelo(vuelos);
  return res.status(HttpStatusCodes.OK).end();
}

async function updatePasajero(req: IReq<{pasajeros: IPasajero}>, res: IRes) {
  const id = +req.params.vueloid;
  const mail = req.params.pasajeroid;
  const { pasajeros } = req.body;
  await VueloService.updatePasajero(id, mail, pasajeros);
  return res.status(HttpStatusCodes.OK).end();
}

async function deleteVuelo(req: IReq, res: IRes) {
  const id = +req.params.id;
  await VueloService.deleteVuelo(id);
  return res.status(HttpStatusCodes.OK).end();
}

async function deletePasajero(req: IReq, res: IRes) {
  const id = +req.params.vueloid
  const mail = req.params.pasajeroid;
  console.log(id)
  console.log(mail)
  await VueloService.deletePasajero(id, mail);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAllVuelos,
  getOneVuelo,
  getAllPasajeros,
  getOnePasajero,
  addVuelo,
  addPasajero,
  updateVuelo,
  updatePasajero,
  deleteVuelo,
  deletePasajero
} as const;
