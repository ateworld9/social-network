declare interface ResponseError {
  message: string;
  errors: any;
}

declare type Include = string;
declare type Fields = string;
declare type Sort = string;
declare interface Page {
  limit?: number;
  offset?: number;
}
declare interface FilterWithOperatorObject {
  columnName: string;
  operator: "=" | "<" | ">" | "<>" | "in" | "like";
  value: any;
}
declare type Filter<T = any> = Partial<T> | FilterWithOperatorObject[];

declare type RequestQuery<T = any> = {
  include?: Include;
  fields?: Fields;
  sort?: Sort;
  page?: Page;
  filter?: Filter<T>;
};
