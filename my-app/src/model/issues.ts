/* eslint-disable no-shadow */
import { BadgeProps } from '../components/Badge';

export interface DataItem {
  name: any;
  color: any;
  login: string;
  title: string;
  description: string;
  labels: [{ name: string; color: string }];
}

export interface Data {
  data: DataItem[];
}

export type List = Partial<DataItem> & { name?: string };

export const enum STATE {
  OPEN = 'open',
  CLOSE = 'close',
}

// union type
export const STATEUnion = {
  OPENED: 'opened',
  CLOSED: 'closed',
} as const;

export interface ListItemData {
  id: string;
  state: 'open' | 'close';
  created_at: string;
  closed_at: string;
  title: string;
  number: number;
  user: { login: string };
  labels: BadgeProps[];
}
