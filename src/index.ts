import ApplicationModelController from './model/application/controller';
import * as pkg from '../package.json';
import { ApplicationModel } from './model/application';
import AgentsModelController from './model/agents/controller';
import Logger from './libs/logger';
import Checko from './libs/checko';

export default class Application {

  public checko: Checko = new Checko('UXmu3i0Aw29YwMYZ');

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

    // this.checko.getCompanyInfo(6621017713);
  }

  public update(updater: (application: Application) => unknown): void {
    updater(this);
    this.save();
  }

  public save(): void {
    window.localStorage.setItem(pkg.name, this.ctrl.toJSON());
  }
}