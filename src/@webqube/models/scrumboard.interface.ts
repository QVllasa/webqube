import { ScrumboardList } from './scrumboard-list.interface';

export interface IScrumboard {
  id: number;
  label: string;
  children: ScrumboardList[];
  starred?: boolean;
}
