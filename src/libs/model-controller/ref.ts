import ModelController from './index';
import ApplicationModelController from '../../model/application/controller';

export default class RefModelController<M> extends ModelController<M> {

  protected readonly applicationModelController: ApplicationModelController;

  constructor(init: M, applicationModelController: ApplicationModelController, id?: number) {
    super(init, id);
    this.applicationModelController = applicationModelController;
  }
}