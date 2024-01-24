import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';
import TypeProduct from './types_product.model';

export default class ClasificationProduct extends Model {
  id_clasification_product: number;
  description: string;
}

ClasificationProduct.init(
  {
    id_clasification_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: DataTypes.STRING,
    id_type_product: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    tableName: 'clasification_product',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

ClasificationProduct.belongsTo(TypeProduct, { foreignKey: 'id_type_product' });

TypeProduct.hasOne(ClasificationProduct, { foreignKey: 'id_type_product' });

// ClasificationProduct.sync({ force: true });
