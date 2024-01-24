import connection from '../core/connection';
import { DataTypes, Model } from 'sequelize';
import User from './user.model';
import Rol from './rol.model';
// import Rol from './rol.model';

export default class Employee extends Model {
  employee_id: number;
  user_id: number;
  password: string;
  credentials_status: boolean;
  rol_id: number;
  updated_by: string;
  deleted_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

Employee.init(
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    password: DataTypes.STRING,
    credentials_status: DataTypes.BOOLEAN,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING,
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
    deleted_at: DataTypes.STRING,
  },
  {
    sequelize: connection,
    tableName: 'employee',
    schema: 'public',
    timestamps: false,
    underscored: true,
  },
);

User.hasOne(Employee, { foreignKey: 'user_id' });

Employee.belongsTo(User, { foreignKey: 'user_id' });

Rol.hasOne(Employee, { foreignKey: 'rol_id' });

Employee.belongsTo(Rol, { foreignKey: 'rol_id' });

// Employee.sync({ force: true });
