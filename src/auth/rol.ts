import { WhereOptions } from 'sequelize';
import Rol from './rol.model';

export default class RolDB {
  async getAll(query): Promise<any> {
    const where: WhereOptions = {};
    if (query.id) where.rol_id = +query.id;
    const rol = await Rol.findAll({ where });
    return rol;
  }

  async update(id: number, body: any): Promise<any> {
    const rol = await Rol.update(body, {
      where: { rol_id: id },
    });
    return rol;
  }

  async create(body: any): Promise<any> {
    const rol = await Rol.create(body);
    return rol;
  }

  async remove(id: number) {
    const rol = await Rol.destroy({
      where: { rol_id: id },
    });
    return rol;
  }
}
