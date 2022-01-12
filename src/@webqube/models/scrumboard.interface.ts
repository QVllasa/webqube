import { ScrumboardList } from './scrumboard-list.interface';
import {IMilestone} from "./models";

export interface IScrumboard {
  id: string;
  label: string;
  children: ScrumboardList[];
  starred?: boolean;
  milestoneID?: IMilestone['id'];
}
