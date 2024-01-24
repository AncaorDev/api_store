import { WhereOptions } from 'sequelize';
import ClasificationProduct from './clasification_product.model';
import TypeProduct from './types_product.model';

export default class ClasificationProductDB {
  async getAll(query?): Promise<any> {
    console.log('query', query);
    const where: WhereOptions = {};
    if (query?.id) where.id_clasification_product = +query.id;
    const clasificationProduct = await ClasificationProduct.findAll({
      where,
      include: [{ model: TypeProduct }],
    });
    return clasificationProduct;
  }

  async update(id: number, body: any): Promise<any> {
    console.log('body', body);
    console.log('id', id);
    const clasificationProduct = await ClasificationProduct.update(body, {
      where: { id_clasification_product: id },
    });
    return clasificationProduct;
  }

  async create(body: any): Promise<any> {
    const product = await ClasificationProduct.create(body);
    return product;
  }

  async remove(id: number) {
    const product = await ClasificationProduct.destroy({
      where: { id_clasification_product: id },
    });
    return product;
  }
}
