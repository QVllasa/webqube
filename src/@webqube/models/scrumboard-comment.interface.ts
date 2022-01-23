import { ScrumboardUser } from './scrumboard-user.interface';


export interface ScrumboardComment {
  from: ScrumboardUser;
  message: string;
  date: Date;
}
