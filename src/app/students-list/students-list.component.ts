import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserModel } from '../services/user-data.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  users: UserModel[];

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
  }

  hasJob(student: UserModel): boolean {
    return student.providerData.linkedin &&
            student.providerData.linkedin.job_title &&
            student.providerData.linkedin.company
  }

}
