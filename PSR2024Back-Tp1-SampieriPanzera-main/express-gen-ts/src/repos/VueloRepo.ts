import { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import  { IVuelo } from '@src/models/Vuelo';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IRes } from '@src/routes/types/express/misc';
import { IReq } from '@src/routes/types/types';
import { IPasajero } from '@src/models/Pasajero';
import express from 'express';
import { Vuelo } from '@src/models/sequelize';

let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
// **** Functions **** //

//Los persists son para comporbar si existe tanto el vuelo como el pasajero pedido, en caso
//de no existir hace que se llame a un error

async function persistsVuelo(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const vuelo of db.vuelos) {
    if (vuelo.id === id) {
      return true;
    }
  }
  return false;
}

async function persistsPasajero(id: number, mail: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const vuelo of db.vuelos) {
    if (vuelo.id === id) {
      console.log(id);
      for (const pasajero of vuelo.pasajeros){
        console.log(pasajero.mail);
        if(pasajero.mail === mail){
          return true;
        }
      }
    }
  }
  return false;
}

//En esta seccion estan definidos todos los gets

async function getAllVuelos(): Promise<IVuelo[]> {
  const vuelos = await Vuelo.findAll();
  console.log(vuelos);
  const db = await orm.openDb();
  return db.vuelos;
}

async function getOneVuelo(id: number): Promise<IVuelo | null> {
  const db = await orm.openDb();
  for (const vuelo of db.vuelos) {
    if (vuelo.id === id) {
      return vuelo;
    }
  }
  return null;
}

async function getAllPasajeros(id: number): Promise<IPasajero[]> {
  const db = await orm.openDb();
  for (const vuelo of db.vuelos) {
    if(vuelo.id ===id){
      return vuelo.pasajeros
    } 
  }
  return [];
}

async function getOnePasajero(id: number, mail: string): Promise<IPasajero | null>  {
  const db = await orm.openDb();
  for (const vuelo of db.vuelos) {
    if(vuelo.id ===id){   
      console.log(vuelo.destino);
      for (const pasajero of vuelo.pasajeros) {
        console.log(pasajero.mail);
        if(pasajero.mail === mail){
          return pasajero;
        }
      }
    } 
  }
  return null;
}
 
//En esta seccion se definen todos los add

async function addVuelo(vuelo: IVuelo): Promise<void> {
  const db = await orm.openDb();
  db.vuelos.push(vuelo);
  return orm.saveDb(db); 
}

async function addPasajero(id: number, pasajero: IPasajero): Promise<void> {
  const db = await orm.openDb();
  const vuelo = db.vuelos.find(v => v.id === id);
  if (vuelo) {
    if (vuelo.asientosDisponibles > 0) {
      vuelo.pasajeros.push(pasajero);
      vuelo.asientosDisponibles--;
      await orm.saveDb(db);
    } 
  } 
}

//En esta seccion se definen los updates

async function updateVuelo(vuelo: IVuelo): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.vuelos.length; i++) {
    if (db.vuelos[i].id === vuelo.id) {
      const dbVuelo = db.vuelos[i];
      db.vuelos[i] = {
        ...dbVuelo,
        id: vuelo.id,
        origen: vuelo.origen,
        destino: vuelo.destino,
        foto: vuelo.foto,
        asientosDisponibles: vuelo.asientosDisponibles,
        precio: vuelo.precio,
        pasajeros: []
      };
      return orm.saveDb(db);
    }
  }
}

async function updatePasajero(id: number, mail: string, pasajero: IPasajero): Promise<void> {
    const db = await orm.openDb();
    const vuelo = db.vuelos.find(v => v.id === id);
    if (vuelo) {
      const pasajeroIndex = vuelo.pasajeros.findIndex(p => p.mail === mail);
      if (pasajeroIndex !== -1) {
        vuelo.pasajeros[pasajeroIndex] = pasajero;
        await orm.saveDb(db);
      }
    }
  } 

//En esta seccion se definen los deletes

async function deleteVuelo(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.vuelos.length; i++) {
    if (db.vuelos[i].id === id) {
      db.vuelos.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

async function deletePasajero(id: number, mail: string): Promise<void> {
    const db = await orm.openDb();
    const vuelo = db.vuelos.find(v => v.id === id);
    if (vuelo) {
      const pasajeroIndex = vuelo.pasajeros.findIndex(p => p.mail === mail);
      if (pasajeroIndex !== -1) {
        vuelo.pasajeros.splice(pasajeroIndex, 1);
        vuelo.asientosDisponibles++;
        await orm.saveDb(db);
      }
    }
  }


// **** Export default **** //

export default {
  getAllVuelos,
  getOneVuelo,
  getAllPasajeros,
  getOnePasajero,
  persistsVuelo,
  persistsPasajero,
  addVuelo,
  addPasajero,
  updateVuelo,
  updatePasajero,
  deleteVuelo,
  deletePasajero
} as const;
