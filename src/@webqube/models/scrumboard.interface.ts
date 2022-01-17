import { IScrumboardList } from './scrumboard-list.interface';
import {IMilestone} from "./models";

export interface IScrumboard {
  id: string;
  label: string;
  children: IScrumboardList[];
  starred?: boolean;
  milestoneID?: IMilestone['id'];
}
