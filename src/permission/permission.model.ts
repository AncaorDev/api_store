import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';

export default class Permission extends Model {
  id_permission: number;
  name: string;
  description: string;
}

Permission.init(
  {
    id_permission: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize: connection,
    tableName: 'permission',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

// Permission.sync({ alter: true });
