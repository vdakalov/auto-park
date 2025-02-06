import { AgentModel } from '../agent';
import { AgentsModel } from './index';
import ModelController from '../../libs/model-controller';
import AgentModelController from '../agent/controller';

export default class AgentsModelController extends ModelController<AgentsModel> {

  private readonly ctrl: AgentModelController[] = [];

  constructor(model: AgentsModel) {
    super(model);

    for (const agentModel of model) {
      const ctrl = new AgentModelController(agentModel);
      this.ctrl.push(ctrl);
    }
  }

  public get(id: number): AgentModelController | undefined {
    return this.ctrl.find(ctrl => ctrl.id === id);
  }

  public addAgentModel(agentModel: AgentModel): AgentModelController {
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