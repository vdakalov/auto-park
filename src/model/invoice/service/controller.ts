import ModelController from '../../../libs/model-controller';
import { InvoiceServiceModel } from '.';

export default class InvoiceServiceModelController extends ModelController<InvoiceServiceModel> {

  public static createModel(name: string, number: number, price: number): InvoiceServiceModel {
    return { name, number, price };
  }

  public static create(name: string, number: number, price: number): InvoiceServiceModelController {
    return new this(this.createModel(name, number, price));
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