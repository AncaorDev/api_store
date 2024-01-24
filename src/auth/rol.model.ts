import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';

export default class Rol extends Model {
  rol_id?: number;
  name: string;
  description: string;
  permission_id: number[];
}

Rol.init(
  {
    rol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    permission_id: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  {
    sequelize: connection,
    tableName: 'rol',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

// Rol.sync({ alter: true });
