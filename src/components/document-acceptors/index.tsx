import Mithril from 'mithril';
import AcceptorComponent from './acceptor';
import AgentSelectComponent, { Agent } from '../agent-select';

export type OnUpdateHandler = (selected: Agent[]) => void;

export type Attrs = {
  acceptors: Agent[];
  selected?: Agent[];
  onUpdate?: OnUpdateHandler;
};

export default class DocumentAcceptorsComponent implements Mithril.ClassComponent<Attrs> {

  private acceptors: Agent[] = [];
  private selected: Agent[] = [];
  private onUpdate: OnUpdateHandler = () => undefined;

  private onRemove(agent: Agent): void {
    const index = this.selected.findIndex(selected => selected.id === agent.id);
    if (index !== -1) {
      this.selected.splice(index, 1);
      this.onUpdate(this.selected.slice(0, this.selected.length));
    }
  }

  private onSelect(agent: Agent): void {
    if (!this.selected.some(selected => selected.id === agent.id)) {
      this.selected.push(agent);
      this.onUpdate(this.selected.slice(0, this.selected.length));
    }
  }

  public oninit(vnode: Mithril.Vnode<Attrs, this>): void {
    this.acceptors = vnode.attrs.acceptors;
    this.selected = vnode.attrs.selected || [];
    this.onUpdate = vnode.attrs.onUpdate || this.onUpdate;
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    const available = this.acceptors.filter(acceptor =>
      !this.selected.some(selected => selected.id === acceptor.id));
    return <ul class="acceptors">
      {this.selected.map(agent =>
        <AcceptorComponent acceptor={agent}
                           onRemove={this.onRemove.bind(this)} />)}
      <li>
        <AgentSelectComponent
          onselect={this.onSelect.bind(this)}
          placeholder="Сторона документа"
          agents={available} />
      </li>
    </ul>;
  }
}
