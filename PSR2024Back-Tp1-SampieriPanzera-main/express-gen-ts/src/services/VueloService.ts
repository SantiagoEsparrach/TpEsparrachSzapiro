import VueloRepo from '@src/repos/VueloRepo';
import { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Vuelo, { IVuelo } from '@src/models/Vuelo';
import { IPasajero } from '@src/models/Pasajero';
import express from 'express';



// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';
export const VUELO_NOT_FOUND = 'Vuelo not found';
export const VUELO_ALREADY_EXISTS = 'Vuelo already exists';
export const PASAJERO_ALREADY_EXISTS = 'Pasajero already exists';
export const PASAJERO_NOT_FOUND = 'Pasajero not found';


let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// **** Functions **** //

/**
 * Get all users.
 */

function getAllVuelos(): Promise<IVuelo[]> {
  return VueloRepo.getAllVuelos();
}

async function getOneVuelo(id: number): Promise<IVuelo | null> {
  const persists = await VueloRepo.persistsVuelo(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_NOT_FOUND,
    );
  }
  
  return VueloRepo.getOneVuelo(id);
}

function getAllPasajeros(id: number): Promise<IPasajero[]> {
  return VueloRepo.getAllPasajeros(id);
}

async function getOnePasajero(id: number, mail: string): Promise<IPasajero | null> {
  const persists = await VueloRepo.persistsPasajero(id, mail);
  
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PASAJERO_NOT_FOUND,
    );
  }
  
  return VueloRepo.getOnePasajero(id, mail);
}

/**
 * Add one user.
 */

async function addVuelo(vuelo: IVuelo): Promise<void> {
  const persists = await VueloRepo.persistsVuelo(vuelo.id);
  
  if (persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_ALREADY_EXISTS,
    );
  }
  return VueloRepo.addVuelo(vuelo);
}

async function addPasajero(id: number, pasajero: IPasajero): Promise<void> {
  const persists = await VueloRepo.persistsVuelo(id);
  const persists1 = await VueloRepo.persistsPasajero(id, pasajero.mail);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_NOT_FOUND,
    );
  }
  else if(persists1){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PASAJERO_ALREADY_EXISTS,
    );
  }
  return VueloRepo.addPasajero(id, pasajero);
}
 
async function updateVuelo(vuelo: IVuelo): Promise<void> {
  const persists = await VueloRepo.persistsVuelo(vuelo.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_NOT_FOUND,
    );
  }
  return VueloRepo.updateVuelo(vuelo);
}

async function updatePasajero(id: number, mail: string, pasajero: IPasajero): Promise<void> {
  const persists = await VueloRepo.persistsVuelo(id);
  const persists2 = await VueloRepo.persistsPasajero(id, mail)
  if (!persists && !persists2) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_NOT_FOUND +" or "+PASAJERO_NOT_FOUND,
    );
  }

  return VueloRepo.updatePasajero(id, mail, pasajero);
}
 
async function deleteVuelo(id: number): Promise<void> {
  const persists = await VueloRepo.persistsVuelo(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_NOT_FOUND,
    );
  }
  
  return VueloRepo.deleteVuelo(id);
}

async function deletePasajero(id: number, mail: string): Promise<void> {
  const persists = await VueloRepo.persistsPasajero(id, mail);
  const persists2 = await VueloRepo.persistsVuelo(id);
  if (!persists && !persists2) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      VUELO_NOT_FOUND +" or "+PASAJERO_NOT_FOUND,
    );
  }
  
  return VueloRepo.deletePasajero(id, mail);
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
