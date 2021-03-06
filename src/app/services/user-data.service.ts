import { Injectable } from '@angular/core';
import { UserId, UserModel, PrivilegeLevel, ProviderMap } from './user-data.model';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  cache: {[key: number]: UserModel} = {}

  constructor(
    private http: HttpClient
  ) { }

  getUsers(tags: string[]): Promise<UserModel[]> {
    return this.http.get<{_type: string, _id: UserId, tags: string[], privilege_level?: string}[]>
    ('/assets/database.json').toPromise()
    .then(data => data.filter(
      doc => doc._type == 'user' && doc.privilege_level === 'Student'
          && doc.tags.some(t => tags.includes(t))
    ).map(doc => doc._id))
    .then(userIds => Promise.all(
      userIds.map(id => this.getUser(id))
    ));
  }

  getUser(id: UserId): Promise<UserModel> {
    if(id in this.cache)
      return new Promise(res => res(this.cache[id]));

    return this.http.get<{_type: string, _id: UserId, [k:string]: any}[]>
    ('/assets/database.json').toPromise()
    .then(docs => {
      const f = predicate => docs.find(predicate);
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

      const ret = {
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

      this.cache[user._id] = ret;
      return ret;
    });
  }

  updateUser(id: UserId, changes: {
    authorizedProviders?, privacySettings?, providerData?
  }): Promise<void> {
    if(id in this.cache)
      this.cache[id] = {
        ...this.cache[id],
        ...changes,
      }

    return new Promise(res => res(void(0)));

    return this.http.patch(`/api/user/${id}`, changes)
      .toPromise()
      .then(() => void(0));
  }

  anonymizeUser(userId: UserId): Promise<void> {
    if(userId in this.cache) {
      this.cache[userId].personalData = null;
      this.cache[userId].providerData.linkedin = {};
    }

    return new Promise(res => res(void(0)));
  }
}
