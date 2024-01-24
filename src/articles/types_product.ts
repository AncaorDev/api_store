import { WhereOptions } from 'sequelize';
import TypeProduct from './types_product.model';

export default class TypesProductDB {
  async getAll(query?): Promise<any> {
    const where: WhereOptions = {};
    if (query.id) where.id_type_product = +query.id;
    const typesProduct = await TypeProduct.findAll({ where });
    return typesProduct;
  }

  async update(id: number, body: any): Promise<any> {
    const typesProduct = await TypeProduct.update(body, {
      where: { id_type_product: id },
    });
    return typesProduct;
  }

  async create(body: any): Promise<any> {
    const typesProduct = await TypeProduct.create(body);
    return typesProduct;
  }

  async remove(id: number) {
    const typesProduct = await TypeProduct.destroy({
      where: { id_type_product: id },
    });
    return typesProduct;
  }
}
