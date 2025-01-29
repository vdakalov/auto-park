import Controller from '../../libs/controller';
import { AgentModel } from './index';
import { LegalEntityModel } from '../legal-entity';
import Logger from '../../libs/logger';
import LegalEntityModelController from '../legal-entity/controller';

export default class AgentModelController extends Controller<AgentModel> {

  private static log: Logger = new Logger(this.name);

  private static nextId: number = 1;

  private static getNextId(): number {
    this.log.debug('getNextId', { currentId: this.nextId });
    return this.nextId++;
  }

  public static create(
    name: string,
    legalEntity: LegalEntityModel
  ): AgentModel {
    return {
      id: this.getNextId(),
      name,
      legalEntity
    };
  }

  public readonly legalEntity: LegalEntityModelController;

  constructor(agentModel: AgentModel) {
    super(agentModel);
    if (this.id >= AgentModelController.nextId) {
      AgentModelController.nextId = this.id + 1;
    }
    this.legalEntity = new LegalEntityModelController(this.model.legalEntity);
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
}