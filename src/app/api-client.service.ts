/* tslint:disable:no-string-literal */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  get options(): {} {
    const options = {};

    if (!environment.production) {
      // options['withCredentials'] = true;
    }

    return options;
  }

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  /**
   * 作成APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param param 作成するオブジェクト
   * @returns Observable
   */
  create<T>(resourceName: string, param: any): Observable<T> {
    return this.http
      .post<T>(this.apiPath(resourceName), param, this.options)
      .pipe(catchError(err => this.handleError<T>(err)));
  }

  /**
   * 取得APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param id URLに含めるリソースID
   * @returns Observable
   */
  get<T>(resourceName: string, id: string): Observable<T> {
    return this.http
      .get<T>(`${this.apiPath(resourceName)}/${id}`, this.options)
      .pipe(catchError(err => this.handleError<T>(err)));
  }

  /**
   * 取得APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param params GETパラメータ
   * @returns Observable
   */
  getWithoutId<T>(resourceName: string, params?: any): Observable<T> {
    const options = this.options;
    options['params'] = params;

    return this.http
      .get<T>(this.apiPath(resourceName), options)
      .pipe(catchError(err => this.handleError<T>(err)));
  }

  /**
   * 一覧APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param params GETパラメータ
   * @returns Observable
   */
  list<T>(resourceName: string, params?: any): Observable<T[]> {
    const options = this.options;
    options['params'] = params;

    return this.http
      .get<T[]>(this.apiPath(resourceName), this.options)
      .pipe(catchError(err => this.handleError<T[]>(err)));
  }

  /**
   * 更新APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param param 更新するオブジェクト
   * @returns Observable
   */
  update<T>(resourceName: string, id: string, param: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiPath(resourceName)}/${id}`, param)
      .pipe(catchError(err => this.handleError<T>(err)));
  }

  /**
   * 更新APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param param 更新するオブジェクト
   * @returns Observable
   */
  updateWithoutId<T>(resourceName: string, param: any): Observable<T> {
    return this.http
      .put<T>(this.apiPath(resourceName), param, this.options)
      .pipe(catchError(err => this.handleError<T>(err)));
  }

  /**
   * 削除APIを呼び出す
   * @param resourceName URLに含めるリソース名
   * @param id URLに含めるリソースID
   * @returns Observable
   */
  delete(resourceName: string, id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiPath(resourceName)}/${id}`, this.options)
      .pipe(catchError(err => this.handleError<void>(err)));
  }

  /**
   * リソース名からAPIパスを返す
   * @param resourceName URLに含めるリソース名
   * @returns APIパス
   */
  private apiPath(resourceName: string): string {
    return `${environment.apiUrl}/${resourceName}`;
  }

  /**
   * エラー制御をする
   * @param err エラー
   * @returns ObservableInput
   */
  private handleError<T>(err: any): ObservableInput<T> {
    console.error(err);
    return throwError(err);
  }
}