import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PrivilegeLevel } from '../services/user-data.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  get dests() {
    const level = this.authService.getPrivilegeLevel();
    return {
      Guest: {},
      Student: {},
      Operator: {
        Statistiques: '/stats',
        Étudiants: '/students'
      },
      Admin: {
        Connexion: '/login',
        Formulaire: '/form',
        Statistiques: '/stats',
        Étudiants: '/students'
      }
    }[PrivilegeLevel[level]];
  }

  get links() {
    return Object.keys(this.dests);
  }

  ngOnInit() {}

}
