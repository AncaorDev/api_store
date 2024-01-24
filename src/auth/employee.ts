import Employee from './employee.model';

export default class EmployeeDB {
  async getAll(): Promise<any> {
    const employees = await Employee.findAll();
    return employees;
  }

  async update(id: number, body: any): Promise<any> {
    const employee = await Employee.update({ where: { id } }, body);
    return employee;
  }

  async createEmployee(employeeCreate: IEmployeeCreate) {
    try {
      const employee = Employee.create({ ...employeeCreate });
      return employee;
    } catch (error) {
      console.log('error', error);
    }
  }
}

export interface IEmployeeCreate {
  user_id: number;
  password: string;
  credentials_status: boolean;
}
