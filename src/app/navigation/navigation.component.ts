import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PrivilegeLevel } from '../services/user-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  get dests(): object {
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

  get links(): string[] {
    return Object.keys(this.dests);
  }

  get connected(): boolean {
    return this.authService.getPrivilegeLevel() > PrivilegeLevel.Guest;
  }

  logout(): void {
    this.authService.logout()
    .then(() => this.router.navigate(['/']))
  }

  ngOnInit() {}

}
