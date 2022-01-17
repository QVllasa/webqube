import { IScrumboardCard } from './scrumboard-card.interface';

export interface IScrumboardList {
  id: string;
  label: string;
  children: IScrumboardCard[];
}
