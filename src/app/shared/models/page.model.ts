export class Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Paging {
  page: number;
  size: number;
}

export enum FetchBehaviour {
  LOAD,
  APPEND,
  REFRESH,
}
