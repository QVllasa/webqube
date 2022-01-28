import { IScrumboardList } from './scrumboard-list.interface';
import {IMilestone, IProject} from "./models";

export interface IScrumboard {
  id?: string;
  list?: IScrumboardList[];
  starred?: boolean;
  milestoneID: IMilestone['id'];
  paid: boolean,
  selected: boolean,
  state: 'progressing' | 'pausing' | 'waiting',
  projectID: IProject['id'],
}

export interface IBoard extends IScrumboard, IMilestone {
}
