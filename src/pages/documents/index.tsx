import Mithril from 'mithril';
import DefaultPage from '../../libs/pages/default';
import { LocationPath } from '../../libs/location-path';
import DocumentComponent from './document';

export type Attrs = {};

export default class DocumentsPage extends DefaultPage<Attrs> {

  public title = 'Документы';

  protected render(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children {
    return <div>
      <button
        class="btn btn-primary"
        onclick={this.setLocation.bind(this, LocationPath.DocumentCreate, {})}
      >Создать новый документ</button>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Автор</th>
          <th scope="col">Название</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {this.application.documents.toArray().map(doc => <DocumentComponent document={doc} />)}
        </tbody>
      </table>
    </div>
  }
}