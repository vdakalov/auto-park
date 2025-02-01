import Controller from '../../../libs/controller';
import { InvoiceServiceModel } from '.';

export default class InvoiceServiceModelController extends Controller<InvoiceServiceModel> {
  public static create(name: string, number: number, price: number): InvoiceServiceModelController {
    return new this({ name, number, price });
  }

  public get name(): string {
    return this.model.name;
  }

  public set name(value: string) {
    this.model.name = value;
  }

  public get number(): number {
    return this.model.number;
  }

  public set number(value: number) {
    this.model.number = value;
  }

  public get price(): number {
    return this.model.price;
  }

  public set price(value: number) {
    this.model.price = value;
  }
}