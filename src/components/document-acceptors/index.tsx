import Mithril from 'mithril';
import AcceptorComponent from '../../pages/document/create/acceptor';
import AgentSelectComponent from '../agent-select';

export type Acceptor = {
  id: number;
  name: string;
};

export type Attrs = {
  acceptors: Acceptor[];
};

// todo finish component to control document acceptors list
//  and apply it in document's pages
export default class DocumentAcceptorsComponent implements Mithril.ClassComponent<Attrs> {
  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <ul class="acceptors">
      {vnode.attrs.acceptors.map(agent =>
        <AcceptorComponent acc={agent}
                           onRemove={this.onRemoveDocumentAcceptor.bind(this)} />)}
      <li>
        <AgentSelectComponent
          onselect={this.onSelectDocumentAcceptor.bind(this)}
          placeholder="Сторона документа"
          agents={agents} />
      </li>
    </ul>;
  }
}