import { IScrumboardCard } from './scrumboard-card.interface';
import {IScrumboard} from "./scrumboard.interface";

export interface IScrumboardList {
  id?: string;
  label: string;
  // projectID: string,
  boardID?: string,
  order: number,
  cards?: IScrumboardCard[];
}
