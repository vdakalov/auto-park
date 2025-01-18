import { AgentModel } from '../agent';
import { AgentsModel } from './index';
import Controller from '../../libs/controller';
import AgentModelController from '../agent/controller';

export default class AgentsModelController extends Controller<AgentsModel> {

  private ctrl: AgentModelController[] = this.model
    .map(agent => new AgentModelController(agent));

  public get(id: number): AgentModelController | undefined {
    return this.ctrl.find(ctrl => ctrl.id === id);
  }

  public add(agentModel: AgentModel): AgentModelController {
    this.model.push(agentModel);
    const ctrl = new AgentModelController(agentModel);
    this.ctrl.push(ctrl);
    return ctrl;
  }

  public *[Symbol.iterator](): Iterator<AgentModelController> {
    for (const ctrl of this.ctrl) {
      yield ctrl;
    }
  }
}