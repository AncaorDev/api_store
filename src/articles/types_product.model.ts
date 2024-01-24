import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';

export default class TypeProduct extends Model {
  id_type_product: number;
  description: string;
}

TypeProduct.init(
  {
    id_type_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: DataTypes.STRING,
  },
  {
    sequelize: connection,
    tableName: 'type_product',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

// TypeProduct.sync({ force: true });
