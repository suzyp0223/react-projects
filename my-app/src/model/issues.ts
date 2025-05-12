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

export interface ListItemData {
  id: string;
  state: 'open' | 'close';
  created_at: string;
  closed_at: string;
  title: string;
  number: number;
  user: { login: string };
  labels: object[];
}
