
export namespace Meta {
  export enum Status {
    Ok = 'ok',
    Error = 'error'
  }

  export type Type = {
    /**
     *
     * @example
     * "ok"
     */
    status: Status;
    /**
     * @example
     * "Не указаны или неверно указаны параметры 'ogrn' или 'inn'"
     */
    message?: string;
    /**
     * @example
     * 3
     */
    today_request_count: number;
    /**
     * @example
     * 0.0
     */
    balance: number;
  };
}

export type Envelop<D> = {
  data: D;
  meta: Meta.Type;
};