import Controller from '../../libs/controller';
import { AgentModel } from './index';
import LegalEntityModelController from '../legal-entity/controller';
import Logger from '../../libs/logger';

export default class AgentModelController extends Controller<AgentModel> {

  private static log: Logger = new Logger(this.name);

  private static nextId: number = 1;

  private static getNextId(): number {
    this.log.debug('getNextId', { currentId: this.nextId });
    return this.nextId++;
  }

  public static create(
    name: string,
    legalName: string,
    legalInn: number = LegalEntityModelController.createInnNumber()
  ): AgentModel {
    return {
      id: this.getNextId(),
      name,
      legalEntity: LegalEntityModelController
        .create(legalName, legalInn)
    };
  }

  constructor(agentModel: AgentModel) {
    super(agentModel);
    if (this.id >= AgentModelController.nextId) {
      AgentModelController.nextId = this.id + 1;
    }
    this.log.debug({ nextId: AgentModelController.nextId });
  }

  public get id(): number {
    return this.model.id;
  }

  public get name(): string {
    return this.model.name;
  }

  public set name(value: string) {
    this.model.name = value;
  }

  public get legalName(): string {
    return this.model.legalEntity.name;
  }

  public set legalName(value: string) {
    this.model.legalEntity.name = value;
  }

  public get legalInn(): number {
    return this.model.legalEntity.inn;
  }

  public set legalInn(value: number) {
    this.model.legalEntity.inn = value;
  }
}