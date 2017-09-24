import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import {Headers, Response, Jsonp,  RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ModuleService {

  constructor(private http: Http) { }


  parts;

  updatePartsByGearbox(order, qgbx){

    let url = 'http://localhost/gls/orders/update-parts.php';
    console.log(qgbx);
     let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

     let options = new RequestOptions({ headers: headers });

     order = { order: order, qgbx: qgbx };
     return this.http.post(url, JSON.stringify(order),options)
        .toPromise();
  }

  getParts()
  {
    this.parts = this.get('http://localhost/gls/parts.php');
    return this.parts;
  }


  updateModuleDetail(part):Promise<any>
  {

        let url = 'http://localhost/gls/module-detail/update-module-detail.php';
         let headers = new Headers();
             headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

         let options = new RequestOptions({ headers: headers });

         part = { part: part };
         return this.http.post(url, JSON.stringify(part),options)
            .toPromise();
  }



  public get(url):Promise<any>
  {
    return this.http.get(url).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
  let body = res.json();
  return body;
}

private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.log(errMsg);
 return Promise.reject(errMsg);

}

availableParts()
{
}





}
