import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GlobalService {
  public httpOptions = {
  headers: new HttpHeaders({Authorization: 'Api-Key AIzaSyCG8PBGxq4vPTQvU5kGbmFCuMi6Hvs_dKY'})
  };
  constructor(public http: HttpClient) { }

  // tslint:disable-next-line:typedef
  $list(path: string): any  {
    return this.http.get(path, this.httpOptions);
  }
}
