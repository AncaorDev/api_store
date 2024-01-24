import Employee from './employee.model';
import User from './user.model';

export default class UserDB {
  async getAll(): Promise<any> {
    const users = await User.findAll();
    return users;
  }

  async update(id: number, body: any): Promise<any> {
    const user = await User.update({ where: { id } }, body);
    return user;
  }

  async getByEmail(email: string) {
    const userByEmail = await User.findOne({
      include: [{ model: Employee }],
      where: { email },
    });
    return userByEmail;
  }

  async createUser(userCreate: IUserCreate) {
    try {
      const user = await User.create({ ...userCreate });
      return user;
    } catch (error) {
      console.log('error', error);
    }
  }
}

export interface IUserCreate {
  name: string;
  last_name: string;
  email: string;
}
