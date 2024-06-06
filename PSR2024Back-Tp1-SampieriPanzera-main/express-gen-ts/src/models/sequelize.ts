import { DataTypes } from 'sequelize';
import sequelize from '../sql/connection'; // Ajusta la ruta según tu estructura de proyecto

export const Vuelo = sequelize.define('Vuelo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asientosDisponibles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

export const Pasajero = sequelize.define('Pasajero', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vueloId: {
      type: DataTypes.INTEGER,
      references: {
        model: Vuelo,
        key: 'id',
      },
    },
  }, {
    timestamps: false,
  });
  
export function defineAssosation() {
    // Asociación de Vuelo a Pasajeros
    Vuelo.hasMany(Pasajero, {
      foreignKey: 'vueloId',
      as: 'pasajeros', // Alias opcional para acceder a los pasajeros desde un vuelo
    });
  
    // Asociación inversa de Pasajero a Vuelo
    Pasajero.belongsTo(Vuelo, {
      foreignKey: 'vueloId',
      as: 'vuelo', // Alias opcional para acceder al vuelo desde un pasajero
    });
}