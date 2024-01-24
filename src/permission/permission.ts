import { WhereOptions } from 'sequelize';
import Permission from './permission.model';

export default class PermissionDB {
  async getAll(query): Promise<any> {
    const where: WhereOptions = {};
    if (query.id) where.id_permission = query.id;
    console.log('where', where);
    const permission = await Permission.findAll({ where });
    return permission;
  }

  async update(id: number, body: any): Promise<any> {
    const permission = await Permission.update(body, {
      where: { id_permission: id },
    });
    return permission;
  }

  async create(body: any): Promise<any> {
    const permission = await Permission.create(body);
    return permission;
  }

  async remove(id: number) {
    const permission = await Permission.destroy({
      where: { id_permission: id },
    });
    return permission;
  }
}
