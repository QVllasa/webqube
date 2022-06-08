import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from "../../../services/project.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IBoard} from "../../../models/scrumboard.interface";
import {IProject} from "../../../models/models";

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  isLoading = false;

  constructor(private projectService: ProjectService, private router: Router,
              public dialogRef: MatDialogRef<DeleteProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IProject) {
  }

  ngOnInit(): void {
  }

  deleteProject() {
    this.isLoading = true;
    try {
      this.projectService.deleteProject(this.data.id).then(() => {
        this.isLoading = false;
        this.dialogRef.close('success');
      })
    }catch (e){
      this.isLoading = false;
      console.log(e)
    }

  }

}
