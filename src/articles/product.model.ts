import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';
import TypeProduct from './types_product.model';
import Store from './store.model';
import MarkProduct from './mark.model';
import ClasificationProduct from './clasification_product.model';

export default class Product extends Model {
  id_tpye_product: number;
  description: string;
}

Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: DataTypes.STRING,
    id_type_product: DataTypes.INTEGER,
    id_clasification_product: DataTypes.INTEGER,
    description: DataTypes.STRING,
    id_mark_product: DataTypes.INTEGER,
    measure: DataTypes.STRING,
    state: DataTypes.STRING,
    situation: DataTypes.STRING,
    id_store: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    qr_code: DataTypes.STRING,
    uuid: DataTypes.UUID,
  },
  {
    sequelize: connection,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

Product.belongsTo(TypeProduct, { foreignKey: 'id_type_product' });

TypeProduct.hasOne(Product, { foreignKey: 'id_type_product' });

Product.belongsTo(Store, { foreignKey: 'id_store' });

Store.hasOne(Product, { foreignKey: 'id_store' });

Product.belongsTo(MarkProduct, { foreignKey: 'id_mark_product' });

MarkProduct.hasOne(Product, { foreignKey: 'id_mark_product' });

Product.belongsTo(ClasificationProduct, {
  foreignKey: 'id_clasification_product',
});

ClasificationProduct.hasOne(Product, {
  foreignKey: 'id_clasification_product',
});

// Product.sync({ force: true });
