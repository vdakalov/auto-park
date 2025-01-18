import { ApplicationModel } from '.';
import Controller from '../../libs/controller';
import AgentsModelController from '../agents/controller';

export default class ApplicationModelController extends Controller<ApplicationModel> {
  public static initModel(): ApplicationModel {
    return {
      agents: []
    };
  }

  public agents = new AgentsModelController(this.model.agents);
}