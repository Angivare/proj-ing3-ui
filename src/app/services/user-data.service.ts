import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserId, UserModel, PrivilegeLevel, ProviderMap } from './user-data.model';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getUsers(tags: string[]): Promise<UserModel[]> {
    return axios.get<{_type: string, _id: UserId, tags: string[], privilege_level?: string}[]>
    ('/assets/database.json').then(resp => resp.data.filter(
      doc => doc._type == 'user' && doc.privilege_level === 'Student'
          && doc.tags.some(t => tags.includes(t))
    ).map(doc => doc._id))
    .then(userIds => Promise.all(
      userIds.map(id => this.getUser(id))
    ));
  }

  getUser(id: UserId): Promise<UserModel> {
    return axios.get<{_type: string, _id: UserId, [k:string]: any}[]>
    ('/assets/database.json').then(resp => {
      const f = predicate => resp.data.find(predicate);
      const user = f(doc => doc._type == 'user' && doc._id == id);
      const npData = f(doc => doc._type == 'non-personal-data' && doc._id == id);
      const pData = user.personal_data ?
        f(doc => doc._type == 'personal-data' && doc._id == user.personal_data)
        : null;

      let providerData = {};
      if(pData) {
        const providers = Object.keys(npData.providers).concat(Object.keys(pData.providers))
              .filter((v, i, self) => self.indexOf(v) === i);
        providers.forEach(p => providerData[p] =  { ...pData.providers[p],
                                      ...npData.providers[p] });
      } else
        providerData = npData.providers;
      // ^ tout ça aurait dû être fait par le DBMS!

      return {
        userId: user._id,
        privilegeLevel: PrivilegeLevel[user.privilege_level as string],
        authorizedTags: user.authorized_tags,
        tags: [],
        personalData: pData ? {
          mail: pData.mail,
          firstName: pData.firstname,
          lastName: pData.lastname,
        } : null,
        authorizedProviders: user.authorized_providers,
        privacySettings: user.privacy_settings,
        providerData: providerData
      }
    });
  }

  updateUser(changes: {
    authorizedProviders?, privacySettings?, providerData?
  }): Promise<void> {
    return new Promise(res => res(void(0)));

    return axios.patch('/api/user', changes)
      .then(() => void(0));
  }

  anonymizeUser(userId: UserId): Promise<void> {
    return new Promise(res => res(void(0)));
  }
}
