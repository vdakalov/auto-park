import Controller from '../../libs/controller';
import { InvoicesModel } from '.';
import { InvoiceModel } from '../invoice';
import InvoiceModelController from '../invoice/controller';
import ApplicationModelController from '../application/controller';

export default class InvoicesModelController extends Controller<InvoicesModel> {

  private readonly ctrl: InvoiceModelController[] = [];

  private readonly applicationModelController: ApplicationModelController;

  constructor(model: InvoicesModel, applicationModelController: ApplicationModelController) {
    super(model);
    this.applicationModelController = applicationModelController;

    for (const invoiceModel of model) {
      const ctrl = new InvoiceModelController(invoiceModel, applicationModelController);
      this.ctrl.push(ctrl);
    }
  }

  public add(invoiceModel: InvoiceModel): InvoiceModelController {
    this.model.push(invoiceModel);
    const ctrl = new InvoiceModelController(invoiceModel, this.applicationModelController);
    this.ctrl.push(ctrl);
    return ctrl;
  }

  public get(value: number): InvoiceModelController | undefined {
    return this.ctrl.find(ctrl => ctrl.id === value);
  }

  public *[Symbol.iterator](): Iterator<InvoiceModelController> {
    for (const ctrl of this.ctrl) {
      yield ctrl;
    }
  }
}