import {Injectable} from '@angular/core';
import environment from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {StorageMap} from "@ngx-pwa/local-storage";

@Injectable({providedIn: 'root'})
export class AuthService {
  private _appUrl: string = environment.appUrl;

  constructor(
    private _httpClient: HttpClient,
    private _storageMap: StorageMap,
  ) {
  }

  public login(data: any): Observable<any> {
    return this._httpClient
      .post(this._appUrl + '/login', {
        email: data.email,
        password: data.password,
      })
      .pipe(
        tap((res: any) => {
          if (res.user && res.token) {
            // @ts-ignore
            localStorage.setItem('user', JSON.stringify(res.user));
            // @ts-ignore
            localStorage.setItem('token', res.token);
            // @ts-ignore
            localStorage.setItem('permissions', JSON.stringify(res.permissions));
          }
          return res;
        })
      );
  }

  /**
   * Do logout
   *
   * @return Observable<Object>
   */
  logout(): Observable<Object> {
    return this._httpClient.post(`${this._appUrl}/auth/logout`, {})
  }


  /**
   * Clear all data stored in local storage
   *
   * @return void
   */
  clearStorage(): void {
    localStorage.clear()
    this._storageMap.clear().subscribe(() => {
    })
  }

  getToken(): string | null {
    // @ts-ignore
    return localStorage.getItem("token")

  }

  /**
   * Get data of permissions by user
   *
   * @returns any
   */
  getPermissions(): any {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '')
    return permissions || null
  }

  hasPermission(permissionName: any) {
    // @ts-ignore
    const permissions = JSON.parse(localStorage.getItem('permissions'))
    if (permissions && permissions.length > 0) {
      const permission = permissions.find((res: any) => {
        return res === permissionName
      })

      if (permission && typeof permission !== 'undefined') {
        return true
      }
    }
    return false
  }

  getDivisi(params: { [x: string]: string | number | boolean; }) {
    let httpParams = new HttpParams()
    for (let key in params) {
      httpParams = httpParams.append(key, params[key])
    }

    return this._httpClient.get(
      environment.appUrl + '/get-user-divisi',
      {params: httpParams}
    )
  }

  getRoles() {
    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem('user'))

    if (currentUser && currentUser.token) {
      return currentUser.user.roles_id
    }

    return false
  }

  getKpi(name: any) {
    // @ts-ignore
    const kpi = JSON.parse(localStorage.getItem('kpi'))
    if (kpi && kpi.length > 0) {
      const dataKpi = kpi.find((res: any) => {

        return res.setting_key === name

      })


      if (dataKpi && typeof dataKpi !== 'undefined') {

        return dataKpi.setting_value
      }
    }

    return false
  }

  getLogin(username: string, password: string, cabang_id: string, perusahaan_id: string, divisi_penjualan_id: string) {
    return this._httpClient.post(
      environment.appUrl + '/tenant/login',
      JSON.stringify({
        username: username,
        password: password,
        perusahaan_id: perusahaan_id,
        cabang_id: cabang_id,
        divisi_penjualan_id: divisi_penjualan_id
      })
    )
      .pipe(
        tap((res: any) => {
          if (res && res.token) {
            //  store user details and jwt token in local storage to keep user logged in between page refreshes
            const {permissions, menus, kpi, tenant_id, ...obj} = res
            localStorage.setItem('permissions', JSON.stringify(permissions))
            localStorage.setItem('kpi', JSON.stringify(kpi))
            localStorage.setItem('currentUser', JSON.stringify(obj))
            localStorage.setItem('tenantId', JSON.stringify(tenant_id))
            localStorage.setItem('menus', JSON.stringify(menus))

            // this._messagingService.requestPermission()
          } else {
            this.logout()
          }
          return res
        })
      )
  }

  changeDivisi(username: string, password: string, cabang_id: string, perusahaan_id: string, divisi_penjualan_id: string) {
    return this._httpClient.post(
      environment.appUrl + '/changeDivisi',
      JSON.stringify({
        username: username,
        password: password,
        perusahaan_id: perusahaan_id,
        cabang_id: cabang_id,
        divisi_penjualan_id: divisi_penjualan_id
      })
    )
      .pipe(
        tap((res: any) => {
          if (res && res.token) {
            //  store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('permissions', JSON.stringify(res.permissions))
            localStorage.setItem('kpi', JSON.stringify(res.user.kpi))
            localStorage.setItem('currentUser', JSON.stringify(res))
          }
          return res
        })
      )
  }

  getUser() {
    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem('user'))

    if (currentUser) {
      return currentUser
    }

    return false
  }

  getMenus() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('menus'))
  }

  getPerusahaan() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('perusahaan_id'))
  }

  getTenantId(): string {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('tenantId'))
  }
}
