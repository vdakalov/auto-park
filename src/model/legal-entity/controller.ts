import { LegalEntityModel } from '.';
import Controller from '../../libs/controller';

export default class LegalEntityModelController extends Controller<LegalEntityModel> {

  public static createInnNumber(length: number = 10): number {
    return Math.ceil(Math.random() * (10 ** length));
  }

  public static create(
    name: string,
    inn: number = LegalEntityModelController.createInnNumber()
  ): LegalEntityModel {
    return { name, inn };
  }
}