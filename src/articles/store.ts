import { WhereOptions } from 'sequelize';
import Store from './store.model';

export default class StoreDB {
  async getAll(query): Promise<any> {
    const where: WhereOptions = {};
    if (query?.id) where.id_store = +query.id;
    const store = await Store.findAll({ where });
    return store;
  }

  async update(id: number, body: any): Promise<any> {
    const store = await Store.update(body, {
      where: { id_store: id },
    });
    return store;
  }

  async create(body: any): Promise<any> {
    const store = await Store.create(body);
    return store;
  }

  async remove(id: number) {
    const store = await Store.destroy({
      where: { id_store: id },
    });
    return store;
  }
}
