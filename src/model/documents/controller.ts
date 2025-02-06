import { DocumentsModel } from '.';
import ListModelController from '../../libs/model-controller/list';
import DocumentModelController from '../document/controller';
import { DocumentModel } from '../document';

export default class DocumentsModelController extends ListModelController<DocumentsModel, DocumentModelController> {

  protected initialize(): void {
    for (const documentModel of this.model) {
      const ctrl = new DocumentModelController(documentModel, this.applicationModelController);
      this.addUniqueItem(ctrl);
    }
  }

  public add(documentModel: DocumentModel): DocumentModelController {
    this.model.push(documentModel);
    const ctrl = new DocumentModelController(documentModel, this.applicationModelController);
    this.addUniqueItem(ctrl);
    return ctrl;
  }

  public get(id: number): DocumentModelController | undefined {
    return this.items.find(document => document.id === id);
  }
}