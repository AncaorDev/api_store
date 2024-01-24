import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';

export default class Store extends Model {
  id_store: number;
  name: string;
  description: string;
}

Store.init(
  {
    id_store: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize: connection,
    tableName: 'store',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

// Store.sync({ force: true });
