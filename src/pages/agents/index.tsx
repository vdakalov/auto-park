import Mithril from 'mithril';
import DefaultLayout from '../../layouts/default';
import AgentsComponent from '../../components/agents';
import Page from '../../libs/page';
import { Path } from '../../libs/router';

export default class AgentsPage extends Page implements Mithril.ClassComponent {

  public title = 'Агенты';

  public view(vnode: Mithril.Vnode<{}, this>): Mithril.Children {
    return <DefaultLayout page={this}>
      {Mithril(Mithril.route.Link, { href: Path.AgentCreate, class: 'btn btn-primary' }, 'Добавить')}

      <AgentsComponent agents={this.application.ctrl.agents} />
    </DefaultLayout>;
  }
}