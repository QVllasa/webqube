import { ScrumboardAttachment } from './scrumboard-attachment.interface';
import { ScrumboardComment } from './scrumboard-comment.interface';
import { ScrumboardUser } from './scrumboard-user.interface';
import { ScrumboardLabel } from './scrumboard-label.interface';
import {IScrumboardList} from "./scrumboard-list.interface";

export interface IScrumboardCard {
  id?: string;
  title: string;
  // projectID:string,
  // scrumboardID?: string,
  listID?: string,
  link?: string;
  description?: string;
  dueDate?: {
    date: Date;
    done: boolean;
  };
  comments?: ScrumboardComment[];
  attachments?: ScrumboardAttachment[];
  users?: ScrumboardUser[];
  labels?: ScrumboardLabel[];
  cover?: ScrumboardAttachment;
}
