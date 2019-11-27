import { Component, OnInit } from '@angular/core';
import { ProviderMap } from '../services/user-data.model';
import { UserDataService } from '../services/user-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

const pName = {
  'linkedin': 'LinkedIn',
  'github': 'GitHub',
};

const sName = {
  'job_title': 'Intitulé du poste',
  'company': 'Entreprise',
  'work_area': 'Lieu de travail',
  'technologies': 'Technologies'
};

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  pName(provider: string): string {
    return pName[provider]
  }
  sName(setting: string): string {
    return sName[setting]
  }

  providers = ['linkedin', 'github'];
  authorizations: ProviderMap<string> = {};
  privacy: ProviderMap<{
    [key: string]: string
  }> = {};
  data: ProviderMap<any> = {};

  constructor(
    public userService: UserDataService,
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userService.getUser(
      this.authService.data.user_id
    ).then(user => {
      this.authorizations = user.authorizedProviders;
      this.privacy = user.privacySettings;
      this.data = user.providerData;

      console.log(user);
    });
  }

  getSettings(provider: string): string[] {
    return Object.keys(
      this.privacy[provider] || {}
    );
  }

  submitAuthorizations(): void {
    const userChanges = {
      authorizedProviders: this.authorizations,
      privacySettings: this.privacy
    };

    this.userService.updateUser(userChanges);
  }

  submitData(): void {
    const userChanges = {
      providerData: this.data
    };

    this.userService.updateUser(userChanges);
  }

  anonymize(): void {
    const ret = confirm("Vous perdrez de manière permanente l'accès à votre compte. "
                      + "Souhaitez-vous continuer?");
    if(ret)
      this.userService.anonymizeUser(
        this.authService.data.user_id
      ).then(
        () => this.authService.logout()
      ).then(
        () => this.router.navigate(['/'])
      );
  }

}
