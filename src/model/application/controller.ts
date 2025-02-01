import { ApplicationModel } from '.';
import Controller from '../../libs/controller';
import AgentsModelController from '../agents/controller';
import InvoicesModelController from '../invoices/controller';

export default class ApplicationModelController extends Controller<ApplicationModel> {
  public static initModel(): ApplicationModel {
    return {
      agents: [],
      invoices: []
    };
  }

  public readonly agents = new AgentsModelController(this.model.agents);

  public readonly invoices = new InvoicesModelController(this.model.invoices, this);
}