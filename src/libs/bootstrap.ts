import Mithril from 'mithril';
import Application from '../index';
import { LocationPath } from './location-path';

import MainPage, { Attrs as MainPageAttrs } from '../pages/main';
import AgentsPage, { Attrs as AgentsPageAttrs } from '../pages/agents';
import AgentCreatePage, { Attrs as AgentCreatePageAttrs } from '../pages/agent/create';
import AgentEditPage, { Attrs as AgentEditPageAttrs } from '../pages/agent/edit';
import AgentPage, { Attrs as AgentPageAttrs } from '../pages/agent';
import InvoicePage, { Attrs as InvoicePageAttrs } from '../pages/invoice/create';
import ExceptionPage, { Attrs as ExceptionPageAttrs } from '../pages/exception';

const application = new Application();

export type PageAttrsMap = {
  [LocationPath.Index]: MainPageAttrs;
  [LocationPath.Agents]: AgentsPageAttrs;
  [LocationPath.AgentCreate]: AgentCreatePageAttrs;
  [LocationPath.AgentEdit]: AgentEditPageAttrs;
  [LocationPath.Agent]: AgentPageAttrs;
  [LocationPath.InvoiceCreate]: InvoicePageAttrs;
  [LocationPath.Exception]: ExceptionPageAttrs;
};

Mithril.route(window.document.body, LocationPath.Index, {
  // General Pages
  [LocationPath.Index]: new MainPage(application),

  // Agents page
  [LocationPath.Agents]: new AgentsPage(application),

  // Agent pages
  [LocationPath.AgentCreate]: new AgentCreatePage(application),
  [LocationPath.AgentEdit]: new AgentEditPage(application),
  [LocationPath.Agent]: new AgentPage(application),

  // Invoice
  [LocationPath.InvoiceCreate]: new InvoicePage(application),

  [LocationPath.Exception]: new ExceptionPage(application),
});
