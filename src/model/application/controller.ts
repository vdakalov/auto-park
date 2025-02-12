import { ApplicationModel } from '.';
import ModelController from '../../libs/model-controller';
import AgentsModelController from '../agents/controller';
import InvoicesModelController from '../invoices/controller';
import DocumentsModelController from '../documents/controller';

export default class ApplicationModelController extends ModelController<ApplicationModel> {
  public static initModel(): ApplicationModel {
    return {
      agents: [],
      invoices: [],
      documents: []
    };
  }

  public readonly agents = new AgentsModelController(
    this.model.agents || (this.model.agents = []), this);

  public readonly invoices = new InvoicesModelController(
    this.model.invoices || (this.model.invoices = []), this);

  public readonly documents = new DocumentsModelController(
    this.model.documents || (this.model.documents = []), this);
}
