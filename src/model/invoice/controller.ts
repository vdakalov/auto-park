import ModelController from '../../libs/model-controller';
import { InvoiceModel } from './index';
import ApplicationModelController from '../application/controller';
import AgentModelController from '../agent/controller';
import { InvoiceServiceModel } from './service';
import InvoiceServiceModelController from './service/controller';

export default class InvoiceModelController extends ModelController<InvoiceModel> {

  public static createModel(id: number = 0, agent: number = 0, services: InvoiceServiceModel[] = []): InvoiceModel {
    return { id, agent, services };
  }

  public static create(agent: number, applicationModelController: ApplicationModelController): InvoiceModelController {
    return new this(this.createModel(this.getNextId(), agent), applicationModelController);
    // return new this({
    //   id: this.getNextId(),
    //   agent,
    //   services: []
    // }, applicationModelController);
  }

  public get id(): number {
    return this.model.id;
  }

  public get agent(): AgentModelController | undefined {
    if (this.agentCtrl !== undefined && this.agentCtrl.id === this.model.agent) {
      return this.agentCtrl;
    }
    if (this.model.agent > 0) {
      return this.agentCtrl = this.applicationModelController.agents.get(this.model.agent);
    }
    this.agentCtrl = undefined;
  }

  public set agent(value: AgentModelController | undefined) {
    if (value !== undefined) {
      this.model.agent = value.id;
      this.agentCtrl = value;
    }
  }

  public get services(): Readonly<InvoiceServiceModelController[]> {
    return this.servicesCtrl;
  }

  private readonly applicationModelController: ApplicationModelController;

  private agentCtrl: AgentModelController | undefined = undefined;

  private readonly servicesCtrl: InvoiceServiceModelController[] = [];

  constructor(model: InvoiceModel, applicationModelController: ApplicationModelController) {
    super(model, model.id);
    this.applicationModelController = applicationModelController;

    // const agent = applicationModelController.agents.get(model.agent);
    // if (agent === undefined) {
    //   throw new Error(`${this.constructor.name}: There is no such agent: id=${model.agent}`);
    // }
    // this.agent = agent;

    for (const serviceModel of model.services) {
      this.addServiceModel(serviceModel);
    }
  }

  public addServiceModel(invoiceServiceModel: InvoiceServiceModel): InvoiceServiceModelController {
    this.model.services.push(invoiceServiceModel);
    const ctrl = new InvoiceServiceModelController(invoiceServiceModel);
    this.servicesCtrl.push(ctrl);
    return ctrl;
  }
}