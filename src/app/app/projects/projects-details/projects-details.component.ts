import {Component} from '@angular/core';
import {IMilestone, IProject, IPlan, IUser, IFeatureDetail, IFeatures} from "../../../../@webqube/models/models";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable, pipe} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IBoard, IScrumboard} from "../../../../@webqube/models/scrumboard.interface";
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {IScrumboardList} from "../../../../@webqube/models/scrumboard-list.interface";
import {IScrumboardCard} from "../../../../@webqube/models/scrumboard-card.interface";
import {ProjectService} from "../../../../@webqube/services/project.service";
import {UserService} from "../../../../@webqube/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProjectComponent} from "../../../../@webqube/components/dialogs/delete-project/delete-project.component";
import {PlanService} from "../../../../@webqube/services/plan.service";
import {BoardService} from "../../../../@webqube/services/board.service";
import {KeyValue} from "@angular/common";
import {Features} from "luxon";

interface NavLink {
  route: string,
  label: string,
  icon: string,
}


@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent {

  navLinks: NavLink[] = [
    {
      route: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    }, {
      route: 'boards',
      label: 'Fortschritt',
      icon: 'dashboard'
    }, {
      route: 'hosting',
      label: 'Hosting',
      icon: 'dashboard'
    }, {
      route: 'addons',
      label: 'Addons',
      icon: 'dashboard'
    }
  ]




  boards$: BehaviorSubject<IBoard[]> = this.boardService.boards$;
  lists$: BehaviorSubject<IScrumboardList[]> = new BehaviorSubject<IScrumboardList[]>(null)
  selectedBoard$: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>(null);



  isSelecting: boolean = false;
  selected: boolean = false;


  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute,
              private http: HttpClient,
              private auth: AngularFireAuth,
              public projectService: ProjectService,
              private boardService: BoardService,
              private planService: PlanService,) {

    this.route.params.pipe(
      switchMap((params)=>{
        console.log('projectID: ', params['projectID'])
        return this.projectService.getProject(params['projectID'])
      })
    ).subscribe();

    // this.boards$.pipe(
    //   filter<IBoard[]>(Boolean),
    //   tap((boards => {
    //     const selectedBoard = boards.find(obj => obj.selected)
    //     this.selectedBoard$.next(selectedBoard);
    //   }))
    // ).subscribe()
    //
    // this.selectedBoard$
    //   .pipe(filter<IBoard>(Boolean),
    //     switchMap((board) => {
    //       return this.boardService.getLists(board.id)
    //     }))
    //   .subscribe((lists) => {
    //     console.log("lists", lists)
    //     this.lists$.next(lists)
    //   })


  }

}
