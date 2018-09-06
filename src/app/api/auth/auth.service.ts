import { Injectable } from '@angular/core';
import { LocalStorageUser } from '../../entities/local-storage-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '//localhost:9000/login?';
  private logoutUrl = '//localhost:9000/logout?';

  constructor() {
  }

  public isLogin(): boolean {
    return window.location.search.indexOf('guid') !== -1;
  }

  public getUser(): LocalStorageUser {
    const user: string = localStorage.getItem('user');

    return JSON.parse(user);
  }

  public setUser(guid: string, id: number, login: string): void {
    localStorage.setItem('user', JSON.stringify({guid, id, login}));
  }

  private queryString(key: string): string {
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp(
          '^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'
        ), '$1'
      )
    );
  }

  public login() {
    window.location.href = this.redirect(this.loginUrl);
  }

  public logout() {
    window.location.href = this.redirect(this.logoutUrl);
  }

  private redirect(redirectUrl: string): string {
    const defaultLocale = localStorage.getItem('defaultLocale');
    let locale = 'ru';

    if (!!defaultLocale) {
      locale = defaultLocale.includes('ru') ? 'ru' : 'en';
    }

    return redirectUrl +
      'clientType=dashboard' +
      '&locale=' + locale +
      '&redirectUrl=' + encodeURIComponent(window.location.origin + '/' + window.location.hash);
  }

  public initApp(): boolean {

    if (!this.isLogin()) {
      this.login();
      return false;
    }

    /** get data from query params*/
    const guid = this.queryString('guid');
    const login = this.queryString('u');
    const id = Number.parseInt(this.queryString('id'));


    /** user save in local storage */
    this.setUser(guid, id, login);

    return true;
  }
}
