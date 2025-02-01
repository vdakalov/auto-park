import Mithril from 'mithril';
import DefaultPage from '../../libs/pages/default';
import AgentsComponent from '../../components/agents';
import { LocationPath } from '../../libs/location-path';

export type Attrs = {};

export default class AgentsPage extends DefaultPage<Attrs> {

  public title = 'Агенты';

  protected render(): Mithril.Children {
    return [
      Mithril(Mithril.route.Link, { href: LocationPath.AgentCreate, class: 'btn btn-primary' }, 'Добавить'),
      <AgentsComponent agents={this.application.ctrl.agents} />
    ];
  }
}