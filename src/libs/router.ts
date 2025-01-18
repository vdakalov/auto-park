import Mithril from 'mithril';

import Application from '..';

import MainPage from '../pages/main';
import AgentsPage from '../pages/agents';
import AgentPage from '../pages/agent';
import AgentEditPage from '../pages/agent/edit';
import AgentCreatePage from '../pages/agent/create';
import ErrorPage from '../pages/error';

export enum Path {
  // Common
  Index = '/',
  Error = '/E404',

  // Agents
  Agents = '/agents',

  // Agent
  AgentCreate = '/agent/create',
  AgentEdit = '/agent/:id/edit',
  Agent = '/agent/:id',
}

const application = new Application();

Mithril.route(window.document.body, Path.Index, {
  // General Pages
  [Path.Index]: new MainPage(application),

  // Agents page
  [Path.Agents]: new AgentsPage(application),

  // Agent pages
  [Path.AgentCreate]: new AgentCreatePage(application),
  [Path.AgentEdit]: new AgentEditPage(application),
  [Path.Agent]: new AgentPage(application),

  [Path.Error]: new ErrorPage(application),
});
