import Product from 'src/articles/product.model';
import connection from '../core/connection';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Movements extends Model {
  id: number;
  uuid: string;
  id_product: number;
  state: string;
  situation: string;
  type_movement: string;
  observation: string;
  amount: number;
  updated_by: Date;
  deleted_by: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

Movements.init(
  {
    id_movement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: DataTypes.UUID,
    id_product: DataTypes.INTEGER,
    state: DataTypes.STRING,
    situation: DataTypes.STRING,
    type_movement: DataTypes.STRING,
    observation: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    guide_remition: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  },
  {
    sequelize: connection,
    tableName: 'movements',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

Movements.belongsTo(Product, { foreignKey: 'id_product' });

Product.hasOne(Movements, { foreignKey: 'id_product' });

// Movements.sync({ alter: true });
