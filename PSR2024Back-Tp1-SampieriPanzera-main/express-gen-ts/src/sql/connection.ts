import { Sequelize } from 'sequelize-typescript';
import Mascota from '../models/Pasajero';
import Vacuna from '../models/User';
import MascotaVacuna from '../models/Vuelo';
import Pasajero from '@src/models/Pasajero';
import User from '@src/models/User';
import Vuelo from '@src/models/Vuelo';

const sequelize = new Sequelize({
  database: 'pasajeros',
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  logging: console.log,
  models: [Pasajero, User, Vuelo], 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sync all models including MascotaVacuna
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database and tables have been created.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
