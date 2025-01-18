import Mithril from 'mithril';
import { Path } from '../../libs/router';
import AgentModelController from '../../model/agent/controller';

export type Attrs = {
  agent: AgentModelController
};

export default class AgentComponent implements Mithril.ClassComponent<Attrs> {

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <tr>
      <td>{vnode.attrs.agent.id}</td>
      <td>{vnode.attrs.agent.name}</td>
      <td>{vnode.attrs.agent.legalName}</td>
      <td>{vnode.attrs.agent.legalInn}</td>
      <td>
        {Mithril(Mithril.route.Link, {
          href: Path.Agent,
          params: {
            id: vnode.attrs.agent.id,
          }
        }, 'Открыть')}
      </td>
    </tr>;
  }
}