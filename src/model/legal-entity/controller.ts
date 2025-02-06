import { LegalEntityModel } from '.';
import ModelController from '../../libs/model-controller';

export default class LegalEntityModelController extends ModelController<LegalEntityModel> {

  public static createInnNumber(length: number = 10): number {
    return Math.ceil(Math.random() * (10 ** length));
  }

  public static create(
    name: string,
    inn: number = LegalEntityModelController.createInnNumber(),
    address: string = ''
  ): LegalEntityModel {
    return { name, inn, address };
  }

  public get name(): string {
    return this.model.name;
  }

  public set name(value: string) {
    this.model.name = value;
  }

  public get inn(): number {
    return this.model.inn;
  }

  public set inn(value: number) {
    this.model.inn = value;
  }

  public get address(): string {
    return this.model.address;
  }

  public set address(value: string) {
    this.model.address = value;
  }
}