import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
// import { randomUUID } from 'crypto';
import MovementsDB from './movements';

@Injectable()
export class MovementsService {
  private movementsDB = new MovementsDB();

  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code.');
    }
  }

  async listMovements(query) {
    try {
      const data = await this.movementsDB.getAll(query);
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listMovements');
    }
  }

  async createMovements(body: any) {
    try {
      const data = await this.movementsDB.createAll(body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to createMovements');
    }
  }

  async updateMovements(id: number, body: any) {
    try {
      delete body.id;
      const data = await this.movementsDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updateMovements');
    }
  }

  async removeMovements(id: number) {
    try {
      const data = await this.movementsDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removeMovements');
    }
  }

  async dashboardMovements(query?) {
    try {
      const data = await this.movementsDB.dashboard(query);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to dashboardMovements');
    }
  }

  async dashboardMovements2(query?) {
    try {
      const data = await this.movementsDB.dashboard2(query);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to dashboardMovements');
    }
  }
}
