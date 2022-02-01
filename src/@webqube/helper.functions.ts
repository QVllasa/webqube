import {IBoard} from "./models/scrumboard.interface";

export function sortByOrder(obj: any[] ) {
  return obj.sort((a, b) => (a.order < b.order ? -1 : 1))
}



