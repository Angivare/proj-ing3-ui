import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: {mail: string, password: string};
  error: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.user = {mail: '', password: ''};
  }

  ngOnInit() {
  }

  submit() {
    this.auth.login(this.user.mail, this.user.password)
    .then(success => success ? this.router.navigate(['/'])
                             : this.error = true
    );
  }

}
