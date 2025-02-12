import Mithril from 'mithril';
import Application from '..';
import Logger from './logger';
import Exception from './exception';
import AgentModelController from '../model/agent/controller';
import InvoiceModelController from '../model/invoice/controller';
import { LocationPath } from './location-path';
import { PageAttrsMap } from './bootstrap';
import DocumentModelController from '../model/document/controller';

export class PageException extends Exception {

  public readonly page: Page<any>;

  constructor(page: Page<any>, message: string) {
    super(message);
    this.page = page;
  }
}

export class PageAttrException extends PageException {
  constructor(page: Page<any>, key: string | number | symbol, value?: string, expected?: string) {
    const pageName = page.constructor.name;
    let message;
    switch (arguments.length - 2) {
      case 1:
        message = `Invalid page attribute (${String(key)}) value: ${value}`;
        break;
      case 2:
        message = `Invalid page attribute (${String(key)}) value: "${value}", but expected ${expected}`;
        break;
      default:
        message = `No page attribute: ${String(key)}`;
    }
    super(page, `${pageName}: ${message}`);
  }
}

type PageInitState = {
  id: string;
  state: unknown;
};

export default abstract class Page<Attrs = {}> implements Mithril.ClassComponent<Attrs> {

  public static initState: PageInitState | undefined = undefined;

  public abstract title: string;

  protected readonly log: Logger = new Logger(this);

  protected readonly application: Application;

  protected vnode: Mithril.Vnode<Attrs, this> = Mithril('[');

  constructor(application: Application) {
    this.application = application;
  }

  protected setVNode(vnode: Mithril.Vnode<Attrs, this>): void {
    this.vnode = vnode;
  }

  protected abstract render(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children;

  protected setLocation<L extends keyof PageAttrsMap>(location: L, attrs: PageAttrsMap[L]): void {
    Page.initState = {
      id: location,
      state: attrs
    };
    Mithril.route.set(location, attrs, {
      state: attrs
    });
    this.log.debug('Set Route', { location, attrs });
  }

  protected setPageException(exception: Exception): void {
    this.setLocation(LocationPath.Exception, {
      exception: exception.toObject()
    });
  }

  public oninit(vnode: Mithril.Vnode<Attrs, this>): void {
    this.log.debug('mithril.oninit', { vnode });
    this.setVNode(vnode);
  }

  public oncreate(vnode: Mithril.VnodeDOM<Attrs, this>): void {
    this.log.debug('mithril.oncreate', { vnode });
  }

  public onbeforeupdate(vnode: Mithril.Vnode<Attrs, this>, old: Mithril.VnodeDOM<Attrs, this>): boolean | void {
    this.log.debug('mithril.onbeforeupdate', { vnode, old });
  }

  public onupdate(vnode: Mithril.VnodeDOM<Attrs, this>): void {
    this.log.debug('mithril.onupdate', { vnode });
  }

  public onbeforeremove(vnode: Mithril.VnodeDOM<Attrs, this>): Promise<void> | void {
    this.log.debug('mithril.onbeforeremove', { vnode });
  }

  public onremove(vnode: Mithril.VnodeDOM<Attrs, this>): void {
    this.log.debug('mithril.onremove', { vnode });
  }

  public view(vnode: Mithril.Vnode<Attrs, this>): Mithril.Children | null | undefined {
    this.setVNode(vnode);
    try {
      return this.render(vnode);
    } catch (error) {
      if (error instanceof Exception) {
        this.setPageException(error);
      } else if (error instanceof Error) {
        const exception = Exception.fromError(error);
        this.setPageException(exception);
      } else {
        console.error('PAGE_ERROR!', { page: this, error });
        alert(`Error on ${this.constructor.name}!\n-----------\nSEE DEV CONSOLE\n-----------\n${String(error)}`);
      }
    }
  }

  public getIntPageAttr(key: keyof Attrs): number | undefined {
    const value = this.vnode.attrs[key];
    const number = Number.parseInt(String(value));
    if (Number.isInteger(number)) {
      return number;
    }
  }

  public getPageId(key?: keyof Attrs): number | undefined {
    const idKey = key === undefined ? 'id' : key;
    const value = this.getIntPageAttr(idKey as keyof Attrs);
    if (value !== undefined && value > 0) {
      return value;
    }
  }

  public getPageAgent(key?: keyof Attrs): AgentModelController | undefined {
    const id = this.getPageId(key);
    if (id !== undefined) {
      return this.application.agents.get(id);
    }
  }

  public getPageInvoice(key?: keyof Attrs): InvoiceModelController | undefined {
    const id = this.getPageId(key);
    if (id !== undefined) {
      return this.application.invoices.get(id);
    }
  }

  public getPageDocument(key?: keyof Attrs): DocumentModelController | undefined {
    const id = this.getPageId(key);
    if (id !== undefined) {
      return this.application.documents.get(id);
    }
  }

  public ensurePageAgent(key?: keyof Attrs): AgentModelController {
    const agent = this.getPageAgent(key);
    if (agent === undefined) {
      throw new PageException(this, 'Agent not found');
    }
    return agent;
  }

  public ensurePageInvoice(key?: keyof Attrs): InvoiceModelController {
    const invoice = this.getPageInvoice(key);
    if (invoice === undefined) {
      throw new PageException(this, 'Invoice not found');
    }
    return invoice;
  }

  public ensurePageDocument(key?: keyof Attrs): DocumentModelController {
    const document = this.getPageDocument(key);
    if (document === undefined) {
      throw new PageException(this, 'Document not found');
    }
    return document;
  }
}
