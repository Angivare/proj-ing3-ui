import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserId, UserModel, PrivilegeLevel, ProviderMap } from './user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getUser(id: UserId): Promise<UserModel> {
    return axios.get<{_type: string, _id: UserId, [k:string]: any}[]>
    ('/assets/database.json').then(resp => {
      const f = predicate => resp.data.find(predicate);
      const user = f(doc => doc._type == 'user' && doc._id == id);
      const npData = f(doc => doc._type == 'non-personal-data' && doc._id == id);
      const pData = f(doc => doc._type == 'personal-data'
                                  && doc._id == user.personal_data);

      const providers = Object.keys(npData.providers).concat(Object.keys(pData.providers))
                          .filter((v, i, self) => self.indexOf(v) === i);
      const providerData = {};
      providers.forEach(p => providerData[p] =  { ...pData.providers[p],
                                                  ...npData.providers[p] });
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
}
