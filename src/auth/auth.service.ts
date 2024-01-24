import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserSession } from './user-session.interface';
import { Token } from './token.interface';
import EmployeeDB from './employee';
import { MessageBag } from './message-bag.enum';
import { Status } from './status.enum';

import * as bcrypt from 'bcrypt';
// import * as moment from 'moment';
import { TransformResponse } from './clean.response';
import UserDB from './user';
import RolDB from './rol';
import PermissionDB from 'src/permission/permission';
const SALT_OR_ROUNDS = 10;

@Injectable()
export class AuthService {
  private employeeDB = new EmployeeDB();
  private userDB = new UserDB();
  private rolDB = new RolDB();
  private permissionDB = new PermissionDB();
  constructor(private readonly jwtServ: JwtService) {}

  public async login(user: UserSession) {
    const expiresIn = 7200000;
    const jwtid = `token:${uuidv4()}`;
    const prm: Token['prm'] = [];

    const payload: Token['payload'] = {
      user_id: user._user.user_id,
      role_id: user._employee.rol_id,
      email: user._user.email,
    };

    const token = this.jwtServ.sign(
      { payload, prm },
      {
        expiresIn: `${expiresIn}s`,
        issuer: 'auth-login',
        jwtid,
      },
    );
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expiresIn / 1000);
    return token;
  }

  public async validateUser(_email: string, _password: string) {
    const employee: any = await this.validateEmployeeFromEmail(_email);

    if (!employee)
      throw new UnauthorizedException(MessageBag.INVALID_CREDENTIALS);
    if (employee.credentials_status === Status.INACTIVE)
      throw new ForbiddenException(MessageBag.ACCOUNT_DISABLED);
    const passwordIsValid = await bcrypt.compare(
      _password,
      employee.Employee.dataValues.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException(MessageBag.INVALID_CREDENTIALS);
    }
    const response: UserSession = {
      _employee: employee.dataValues.Employee.dataValues,
      _user: employee.dataValues,
    };
    delete response._employee['password'];
    delete response._user['Employee'];
    return TransformResponse.get(response);
  }

  public async validateEmployeeFromEmail(email: string): Promise<any> {
    const user: any = await this.userDB.getByEmail(email);
    if (!user) throw new UnauthorizedException(MessageBag.INVALID_MAIL);
    if (user.credentials_status === Status.INACTIVE)
      throw new UnauthorizedException(MessageBag.ACCOUNT_DISABLED);
    return user;
  }

  public async createUser(body): Promise<any> {
    body.password = await this.generatePassword({ password: body.password });
    const user = await this.userDB.createUser(body);
    const employee = await this.employeeDB.createEmployee({
      ...body,
      user_id: user.dataValues.user_id,
    });
    const data = { ...user, ...employee };
    return data;
  }

  public async generatePassword({ password }: any) {
    const hash = await bcrypt.hash(password, SALT_OR_ROUNDS);
    return hash;
  }

  public async listRol(query) {
    const rol = await this.rolDB.getAll(query);
    const _rol = JSON.parse(JSON.stringify(rol));
    const _data = _rol.map(async (data_rol) => {
      console.log('data_rol.permission_id', data_rol.permission_id);
      const permission = await this.permissionDB.getAll({
        id: data_rol.permission_id,
      });
      const _permission = JSON.parse(JSON.stringify(permission));
      data_rol.permission = _permission;
    });
    await Promise.all(_data);
    return _rol;
  }

  public async createRol(body) {
    return await this.rolDB.create(body);
  }

  public async updateRol(id, body) {
    return await this.rolDB.update(id, body);
  }

  public async deleteRol(id) {
    return await this.rolDB.remove(id);
  }
}
