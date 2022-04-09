import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {




  options: AnimationOptions = {
    path: '/assets/animations/cactus.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor() {

  }


  ngOnInit(): void {
  }


}
