import {Component} from '@angular/core';
import {IMilestone, IProject, IPlan, IUser, IFeatureDetail, IFeatures} from "../../../../@webqube/models/models";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable, of, pipe} from "rxjs";
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
      icon: 'inventory'
    }, {
      route: 'hosting',
      label: 'Hosting',
      icon: 'cloud'
    }, {
      route: 'addons',
      label: 'Addons',
      icon: 'extension'
    }
  ]


  constructor(
    public projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    const projectID = this.route.snapshot.params['projectID'];
    this.projectService.loadProject(projectID)
  }

}
