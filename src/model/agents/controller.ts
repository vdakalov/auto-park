import { AgentModel } from '../agent';
import { AgentsModel } from './index';
import ListModelController from '../../libs/model-controller/list';
import AgentModelController from '../agent/controller';

export default class AgentsModelController extends ListModelController<AgentsModel, AgentModelController> {

  protected initialize(): void {
    for (const agentModel of this.model) {
      const ctrl = new AgentModelController(agentModel);
      this.items.push(ctrl);
    }
  }

  public get(id: number): AgentModelController | undefined {
    return this.items.find(ctrl => ctrl.id === id);
  }

  public addAgentModel(agentModel: AgentModel): AgentModelController {
    this.model.push(agentModel);
    const ctrl = new AgentModelController(agentModel);
    this.items.push(ctrl);
    return ctrl;
  }
}
