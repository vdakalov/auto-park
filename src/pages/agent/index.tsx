import Mithril from 'mithril';
import DefaultLayout from '../../layouts/default';
import Page from '../../libs/page';
import { Path } from '../../libs/router';

export type Attrs = {
  id: string;
};

export default class AgentPage extends Page implements Mithril.ClassComponent<Attrs> {

  public title = 'Unknown Agent';

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const agent = this.getAgentByIdParam(vnode.attrs.id);
    this.title = agent.name;
    return <DefaultLayout page={this}>
      {Mithril(Mithril.route.Link, {
        class: 'btn btn-primary',
        href: Path.AgentEdit,
        params: {
          id: agent.id
        }
      }, 'Изменить')}
      <p>Название организации: {agent.legalName}</p>
      <p>ИНН: {agent.legalInn}</p>
    </DefaultLayout>
  }
}