import { Injectable } from '@nestjs/common';
// import { randomUUID } from 'crypto';
import MovementsDB from './permission';

@Injectable()
export class PermissionService {
  private movementsDB = new MovementsDB();

  async listPermission(query) {
    try {
      const data = await this.movementsDB.getAll(query);
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listMovements');
    }
  }

  async createPermission(body: any) {
    try {
      const data = await this.movementsDB.create(body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to createPermission');
    }
  }

  async updatePermission(id: number, body: any) {
    try {
      delete body.id;
      const data = await this.movementsDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updatePermission');
    }
  }

  async removePermission(id: number) {
    try {
      const data = await this.movementsDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removePermission');
    }
  }
}
