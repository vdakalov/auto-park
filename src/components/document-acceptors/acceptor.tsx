import Mithril from 'mithril';
import { Agent } from '../agent-select';

export type Attrs = {
  acceptor: Agent;
  onRemove?: (agent: Agent) => void;
};

export default class AcceptorComponent implements Mithril.ClassComponent<Attrs> {

  private onRemove(agent: Agent, callback: (agent: Agent) => void): void {
    callback(agent);
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const agent = vnode.attrs.acceptor;
    const cb = vnode.attrs.onRemove;
    const removeButton = cb === undefined ? undefined
      : <button class="btn btn-link"
    onclick={this.onRemove.bind(this, agent, cb)}>Убрать</button>;
    return <li>
      {agent.name}
    {removeButton}
    </li>;
  }
}
