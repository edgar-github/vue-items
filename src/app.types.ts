export interface Item {
  id: number;
  name: string;
  matches?: number;
  items: Child[];
}

export interface Child {
  id: number;
  name: string;
}

export interface Record {
  action: Action;
  item: Item;
  date: Date;
}

export interface Toggler {
  from: Side;
  to: Side;
  id: number;
}

export enum Action { Added, Removed }

export type Side = 'left' | 'right'
