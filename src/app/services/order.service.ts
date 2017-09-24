import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Headers, Response, Jsonp,  RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  url = 'http://localhost/gls/orders/get.php';

  add(order)
  {
    let url = 'http://localhost/gls/orders/add.php';

     let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

     let options = new RequestOptions({ headers: headers });

     order = { order: order };
     console.log(order);
     return this.http.post(url, JSON.stringify(order),options)
        .toPromise()
  }

  getOrders()
  {
    return this.get(this.url);
  }

  update(order):Promise<any>
  {
    let url = 'http://localhost/gls/orders/update.php';

     let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

     let options = new RequestOptions({ headers: headers });

     order = { order: order };
     return this.http.post(url, JSON.stringify(order),options)
        .toPromise()
  }

  public get(url):Promise<any>
  {
    return this.http.get(url).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
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
 return Promise.reject(errMsg);

}

}
