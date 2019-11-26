import { Injectable } from '@angular/core';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import { UserId, PrivilegeLevel } from './user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string = null;
  data: {
    user_id: UserId,
    name: string,
    privilege_level: PrivilegeLevel,
    authorized_tags: string[]
  } = null;

  constructor() { }

  // Le fait de faire une requête sur un nom spécifique simule
  // le fonctionnement d'une API qui vérifie les valeurs & renvoie
  // un JWT derrière... La clef secrète est 'my-secret'
  login(mail: string, password: string): Promise<boolean> {
    return axios.get<string>(`/assets/auth/${mail}-${password}`)
      .then(resp => {
        this.token = resp.data;
        const data: {
          user_id: number,
          name: string,
          privilege_level: string,
          authorized_tags: string[]
        } = jwt_decode(resp.data);
        this.data = {
          ...data,
          privilege_level: PrivilegeLevel[data.privilege_level]
        };
        return true;
      }).catch(err => {
        if(err.response && err.response.status === 404)
          return false;

        throw(err);
      });
  }

  logout(): Promise<void> {
    // On simule un appel HTTP qui nous déconnecterait
    return new Promise(resolve => resolve())
      .then(() => {
        this.token = null;
        this.data = null;
      });
  }

  getPrivilegeLevel(): PrivilegeLevel {
    return this.data && this.data.privilege_level
          || PrivilegeLevel.Guest;
  }
}
