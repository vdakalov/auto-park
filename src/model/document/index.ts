
export type DocumentModel = {
  id: number;
  /**
   * Agent creates document
   */
  author: number;
  title: string;
  content: string;
  acceptors: number[];
};