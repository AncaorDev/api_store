import { QueryTypes, WhereOptions } from 'sequelize';
import Movements from './movements.model';
import Product from 'src/articles/product.model';
import Store from 'src/articles/store.model';
import TypeProduct from 'src/articles/types_product.model';
import MarkProduct from 'src/articles/mark.model';
import ClasificationProduct from 'src/articles/clasification_product.model';
export default class MovementsDB {
  async getAll(query): Promise<any> {
    const where: WhereOptions = {};
    if (query.id) where.id_movement = +query.id;
    if (query.type_movement) where.type_movement = query.type_movement;
    const movements = await Movements.findAll({
      include: [
        {
          model: Product,
          include: [
            { model: Store },
            { model: TypeProduct },
            { model: MarkProduct },
            { model: ClasificationProduct },
          ],
        },
      ],
      where,
      order: [['id_movement', 'DESC']],
    });
    return movements;
  }

  async update(id: number, body: any): Promise<any> {
    const movement = await Movements.update(body, {
      where: { id_movement: id },
    });
    return movement;
  }

  async create(body: any): Promise<any> {
    const movement = await Movements.create(body);
    return movement;
  }

  async createAll(body: any): Promise<any> {
    let id_last_guide = +(await this.getLastGuide()) || 0;
    id_last_guide++;
    body.map((row: any) => {
      row.guide_remition = id_last_guide;
    });
    const movement = await Movements.bulkCreate(body);
    return movement;
  }

  async remove(id: number) {
    const movement = await Movements.destroy({
      where: { guide_remition: id },
    });
    return movement;
  }

  async getLastGuide() {
    const movements = await Movements.max('guide_remition');
    return movements;
  }

  async dashboard(query?) {
    const where: WhereOptions = {};
    if (query.id) where.id_movement = +query.id;
    const movements = await Movements.sequelize.query(
      `SELECT COUNT(*) filter(where type_movement = 'INGRESO') ingresos,
      COUNT(*) filter(where type_movement = 'SALIDA') salidas,
      TO_CHAR(created_at, 'DD-MM-YYYY'), ('SEMANA ' || TO_CHAR(created_at, 'W')) semana
 FROM public.movements
 GROUP BY  TO_CHAR(created_at, 'DD-MM-YYYY'), TO_CHAR(created_at, 'W')
 ORDER BY TO_CHAR(created_at, 'W');`,
      {
        type: QueryTypes.SELECT,
      },
    );
    return movements;
  }

  async dashboard2(query?) {
    const where: WhereOptions = {};
    if (query.id) where.id_movement = +query.id;
    const movements = await Movements.sequelize.query(
      `SELECT COUNT(*) cantidad,
      TO_CHAR(created_at, 'DD-MM-YYYY'), ('SEMANA ' || TO_CHAR(created_at, 'W')) semana
 FROM public.movements
 GROUP BY  TO_CHAR(created_at, 'DD-MM-YYYY'), TO_CHAR(created_at, 'W')
 ORDER BY TO_CHAR(created_at, 'W');`,
      {
        type: QueryTypes.SELECT,
      },
    );
    return movements;
  }
}
