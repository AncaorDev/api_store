import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';

export default class User extends Model {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  updated_by: string;
  deleted_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING,
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
    deleted_at: DataTypes.STRING,
  },
  {
    sequelize: connection,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

// User.sync({ force: true });
