import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';

export default class MarkProduct extends Model {
  id_mark_product: number;
  name: string;
  description: string;
}

MarkProduct.init(
  {
    id_mark_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize: connection,
    tableName: 'mark_product',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

// MarkProduct.sync({ force: true });
