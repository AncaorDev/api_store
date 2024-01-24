import { WhereOptions } from 'sequelize';
import ClasificationProduct from './clasification_product.model';
import MarkProduct from './mark.model';
import Product from './product.model';
import Store from './store.model';
import TypeProduct from './types_product.model';

export default class ProductDB {
  async getAll(query?): Promise<any> {
    const where: WhereOptions = {};
    if (query?.id) where.id_product = +query.id;
    const product = await Product.findAll({
      where,
      include: [
        { model: Store },
        { model: TypeProduct },
        { model: MarkProduct },
        { model: ClasificationProduct },
      ],
    });
    return product;
  }

  async update(id: number, body: any): Promise<any> {
    const product = await Product.update(body, {
      where: { id_product: id },
    });
    return product;
  }

  async create(body: any): Promise<any> {
    const product = await Product.create(body);
    return product;
  }

  async remove(id: number) {
    const product = await Product.destroy({
      where: { id_product: id },
    });
    return product;
  }
}
