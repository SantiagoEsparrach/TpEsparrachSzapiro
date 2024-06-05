import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Pasajero from './pasajero.model';

@Table({
  timestamps: true, // Esto agrega createdAt y updatedAt automáticamente
})
class Vuelo extends Model<Vuelo> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  origen!: string;

  @Column(DataType.STRING)
  destino!: string;

  @Column(DataType.DATE)
  fecha!: Date;

  @Column(DataType.INTEGER)
  capacidad!: number;

  @ForeignKey(() => Pasajero)
  @Column
  pasajeroId!: number;

  @BelongsTo(() => Pasajero)
  pasajero!: Pasajero;
}

export default Vuelo;
