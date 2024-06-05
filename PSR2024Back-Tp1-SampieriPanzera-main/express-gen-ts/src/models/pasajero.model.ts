import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Vuelo from './vuelo.model';

@Table({
  timestamps: true, // Esto agrega createdAt y updatedAt automáticamente
})
class Pasajero extends Model<Pasajero> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  nombre!: string;

  @Column(DataType.STRING)
  apellido!: string;

  @Column(DataType.STRING)
  documento!: string;

  @HasMany(() => Vuelo)
  vuelos!: Vuelo[];
}

export default Pasajero;
