import { IScrumboardCard } from './scrumboard-card.interface';
import {IScrumboard} from "./scrumboard.interface";

export interface IScrumboardList {
  id?: string;
  label: string;
  cards?: IScrumboardCard[];
}
