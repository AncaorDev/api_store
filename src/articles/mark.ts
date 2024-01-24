import { WhereOptions } from 'sequelize';
import MarkProduct from './mark.model';

export default class MarkProductDB {
  async getAll(query): Promise<any> {
    const where: WhereOptions = {};
    if (query.id) where.id_mark_product = +query.id;
    const mark = await MarkProduct.findAll({ where });
    return mark;
  }

  async update(id: number, body: any): Promise<any> {
    const mark = await MarkProduct.update(body, {
      where: { id_mark_product: id },
    });
    return mark;
  }

  async create(body: any): Promise<any> {
    const mark = await MarkProduct.create(body);
    return mark;
  }

  async remove(id: number) {
    const mark = await MarkProduct.destroy({
      where: { id_mark_product: id },
    });
    return mark;
  }
}
