import {Component, Input, OnInit} from '@angular/core';
import {IPlan, IProject} from "../../models/models";
import {BehaviorSubject} from "rxjs";
import {PlanService} from "../../services/plan.service";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css']
})
export class SelectPlanComponent implements OnInit {

  @Input() project: IProject;
  @Input() headline: string;
  @Input() subheadline: string;
  @Input() bookCall: boolean;



  isSavingTier: boolean = false;
  plans: IPlan[];
  plan$: BehaviorSubject<IPlan> = new BehaviorSubject<IPlan>(null);

  constructor(private planService: PlanService,private projectService: ProjectService) { }

  ngOnInit(): void {
    this.planService.getPlans().then(plans => {
      this.plans = plans;
    });
  }

  isSelected(tier: IPlan) {
    return this.plan$.value === tier;
  }

  onSelectTier(tier: IPlan) {
    this.plan$.value === tier ? this.plan$.next(null) : this.plan$.next(tier);
  }

  async initProject(plan: IPlan) {
    this.isSavingTier = true;
    await this.projectService.initProject(plan, this.project.id)
    this.isSavingTier = false;
  }

}
