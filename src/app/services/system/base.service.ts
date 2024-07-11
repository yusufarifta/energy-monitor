import {inject, Injectable, Injector} from "@angular/core";
import environment, {Environment} from "../../../environments/environment";
import {StorageMap} from "@ngx-pwa/local-storage";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})
export abstract class BaseService {
  private readonly appUrl: string
  private httpClient: HttpClient
  private env: Environment
  protected endPoint!: string
  public cache: boolean
  public cacheName!: string
  public storageMap: StorageMap

  protected constructor() {
    this.env = environment
    this.appUrl = this.env.appUrl
    this.cache = false
    this.httpClient = inject(HttpClient)
    this.storageMap = inject(StorageMap)
  }

  /**
   * Send http GET method to API server
   *
   * @param params any
   * @return Observable<any>
   */
  get(params?: any): Observable<any> {
    let searchMode: boolean = false

    let httpParams: HttpParams = new HttpParams()
    if (typeof params !== 'undefined') {
      for (const key in params) {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key])
          searchMode = true
        }
      }
    }

    if (this.cache && !searchMode) {
      return this.getCache(false, httpParams)
    }

    return this.httpClient.get(`${this.appUrl}/${this.endPoint}`, {params: httpParams})
  }

  /**
   * Send http POST method to API server
   *
   * @param request any
   * @return Observable<Object>
   */
  save(request: any): Observable<any> {
    return this.httpClient.post(`${this.appUrl}/${this.endPoint}`, request)
  }

  /**
   * Send http PUT method to API server
   *
   * @param request any
   * @param primaryKey
   * @return Observable<Object>
   */
  update(request: any, primaryKey: number):Observable<any> {
    return this.httpClient.put(`${this.appUrl}/${this.endPoint}/${primaryKey}`, request)
  }

  /**
   * Send http DELETE method to API server
   *
   * @param primaryKey number
   * @return Observable<Object>
   */
  delete(primaryKey: number): Observable<any> {
    return this.httpClient.delete(`${this.appUrl}/${this.endPoint}/${primaryKey}`)
  }

  /**
   * Get Detail method to API server
   *
   * @param id number
   * @return Observable<any>
   */

  getDetail(id: string): Observable<any> {
    return this.httpClient.get(`${this.appUrl}/${this.endPoint}/${encodeURI(id)}`)
  }

  /**
   * Get data from cache, if cache empty then load data from server
   *
   * @param refreshCache
   * @param httpParams
   */
  getCache(refreshCache: boolean, httpParams: any) {
    httpParams = httpParams || new HttpParams()
    return this.storageMap.get(this.cacheName)
      .pipe(
        switchMap((data: any) => {
          if (typeof data !== 'undefined' && !refreshCache) {
            // @ts-ignore
            console.log('data from cache')
            return of(data)
          } else {
            // @ts-ignore
            console.log('load data from http')
            return this.httpClient.get(this.env.appUrl + '/' + this.endPoint, {params: httpParams}).pipe(
              map((res) => {
                this.storageMap.set(this.cacheName, res).subscribe(() => {
                })
                return res
              })
            )
          }
        })
      )
  }

  /**
   * Update Cache Data
   *
   */
  updateCache() {
    return this.getCache(true, false)
  }
}
