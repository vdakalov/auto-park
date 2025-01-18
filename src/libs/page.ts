import Mithril from 'mithril';
import { Path } from './router';
import Application from '..';
import Logger from './logger';
import AgentModelController from '../model/agent/controller';

export default abstract class Page {

  public abstract title: string;

  protected readonly log: Logger = new Logger(this);

  protected readonly application: Application;

  constructor(application: Application) {
    this.application = application;
  }

  // protected try<T>(handler: () => T): T {
  //   try {
  //     return handler();
  //   } catch (e) {
  //     const error = e instanceof Error ? e : new Error(String(e));
  //     Mithril.route.set(Path.Error, { error });
  //   }
  // }

  public getAgentByIdParam(value: string): AgentModelController {
    const id = Number.parseInt(value);
    if (Number.isInteger(id) && id > 0) {
      const agent = this.application.agents.get(id);
      if (agent !== undefined) {
        return agent;
      }
    }

    throw new Error(`Unable to find agent by id: ${value}`);
  }
}
