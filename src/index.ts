import ApplicationModelController from './model/application/controller';
import * as pkg from '../package.json';
import { ApplicationModel } from './model/application';
import AgentsModelController from './model/agents/controller';
import Logger from './libs/logger';

export default class Application {

  public model: ApplicationModel;

  public ctrl: ApplicationModelController;

  public agents: AgentsModelController;

  private readonly log: Logger = new Logger(this);

  constructor() {
    (window as any).application = this;

    const json = window.localStorage.getItem(pkg.name);
    this.model = json != null && json.length !== 0 ? JSON.parse(json)
      : ApplicationModelController.initModel();

    this.ctrl = new ApplicationModelController(this.model);
    this.agents = this.ctrl.agents;
  }

  public update(updater: (application: Application) => unknown): void {
    updater(this);
    this.save();
  }

  public save(): void {
    window.localStorage.setItem(pkg.name, this.ctrl.toJSON());
  }
}