import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
import TypesProductDB from './types_product';
import ProductDB from './product';
import MarkProductDB from './mark';
import ClasificationProductDB from './clasification_product';
import StoreDB from './store';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticleService {
  private typesProductDB = new TypesProductDB();
  private markProductDB = new MarkProductDB();
  private productDB = new ProductDB();
  private storeDB = new StoreDB();
  private clasificationProductDB = new ClasificationProductDB();
  private exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
  };

  calculateExchange(amount: number, fromCurrency: string, toCurrency: string) {
    const exchangeRate =
      this.exchangeRates[toCurrency] / this.exchangeRates[fromCurrency];
    const exchangedAmount = amount * exchangeRate;

    return {
      amount,
      exchangedAmount,
      fromCurrency,
      toCurrency,
      exchangeRate,
    };
  }

  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code.');
    }
  }

  async listTypesProduct(query) {
    try {
      const data = await this.typesProductDB.getAll(query);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listTypesProduct');
    }
  }

  async listProduct(query) {
    try {
      const data = await this.productDB.getAll(query);
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listProduct');
    }
  }

  async createProduct(body) {
    try {
      body.uuid = randomUUID();
      const data = await this.productDB.create(body);
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listProduct');
    }
  }

  async updateProduct(id: number, body: any) {
    try {
      delete body.id_product;
      const data = await this.productDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updateProduct');
    }
  }

  async removeProduct(id: number) {
    try {
      const data = await this.productDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removeProduct');
    }
  }

  async createTypesProduct(body: any) {
    try {
      const data = await this.typesProductDB.create(body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to createTypesProduct');
    }
  }

  async updateTypesProduct(id: number, body: any) {
    try {
      delete body.id_type_product;
      const data = await this.typesProductDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updateTypesProduct');
    }
  }

  async removeTypesProduct(id: number) {
    try {
      const data = await this.typesProductDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removeTypesProduct');
    }
  }

  async listMarkProduct(query) {
    try {
      const data = await this.markProductDB.getAll(query);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listMarkProduct');
    }
  }

  async createMarkProduct(body: any) {
    try {
      const data = await this.markProductDB.create(body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to createMarkProduct');
    }
  }

  async updateMarkProduct(id: number, body: any) {
    try {
      delete body.id_type_product;
      const data = await this.markProductDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updateMarkProduct');
    }
  }

  async removeMarkProduct(id: number) {
    try {
      const data = await this.markProductDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removeMarkProduct');
    }
  }

  async listClasificationProduct(query) {
    try {
      const data = await this.clasificationProductDB.getAll(query);
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listClasificationProduct');
    }
  }

  async createClasificationProduct(body: any) {
    try {
      const data = await this.clasificationProductDB.create(body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to createClasificationProduct');
    }
  }

  async updateClasificationProduct(id: number, body: any) {
    console.log('id', id);
    try {
      delete body.id_clasification_product;
      const data = await this.clasificationProductDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updateClasificationProduct');
    }
  }

  async removeClasificationProduct(id: number) {
    console.log('id', id);
    try {
      const data = await this.clasificationProductDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removeClasificationProduct');
    }
  }

  async listStore(query) {
    try {
      const data = await this.storeDB.getAll(query);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to listStore');
    }
  }

  async createStore(body: any) {
    try {
      const data = await this.storeDB.create(body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to createStore');
    }
  }

  async updateStore(id: number, body: any) {
    try {
      const data = await this.storeDB.update(id, body);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to updateStore');
    }
  }

  async removeStore(id: number) {
    try {
      const data = await this.storeDB.remove(id);
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to removeStore');
    }
  }
}
