import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('vuelos', 'alumno', 'alumnoipm', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});
export async function db(){
  try{
    await sequelize.sync({force:true})
    console.log("todo ok");
  } catch (err){
    console.error("todo mal")
  }
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default sequelize;
