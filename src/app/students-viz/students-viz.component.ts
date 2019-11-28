import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserModel } from '../services/user-data.model';
import { UserDataService } from '../services/user-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-students-viz',
  templateUrl: './students-viz.component.html',
  styleUrls: ['./students-viz.component.scss']
})
export class StudentsVizComponent implements OnInit {

  users: UserModel[];

  @ViewChild('authorizedOptionChart', {static: true})
  authorizedOptionCanvas: ElementRef;
  authorizedOptionsChart: Chart;

  constructor(
    public userService: UserDataService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userService.getUsers(
      this.authService.data.authorized_tags
    ).then(
      users => this.users = users
    );

    this.authorizedOptionsChart = new Chart(this.authorizedOptionCanvas
                                                        .nativeElement, {
      type: 'bar',
      data: {
        labels: ['icc', 'ia'],
        datasets: [{
          label: 'Importés dans l\'appli',
          data: [200, 300],
          backgroundColor: 'green'
        }, {
          label: 'Ayant consenti à la collecte',
          data: [60, 75],
          backgroundColor: 'magenta'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
