import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  public jwtToken: string;

  constructor(private http: Http) {
    const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  register(oUser) {
    const headers = new Headers ({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:4000/register', JSON.stringify(oUser), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUser(userid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:4000/api/user/${userid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUsers() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${this.jwtToken}`);
  const options = new RequestOptions({ headers: headers });

  return this.http.get(`http://localhost:4000/api/user`, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);

  }

  updateUser(userid, oUser) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`http://localhost:4000/api/user/${userid}`, JSON.stringify(oUser), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updatePassword(userid, oUser) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`http://localhost:4000/api/password/${userid}`, JSON.stringify(oUser), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  deluserDetails(userid){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:4000/api/user/${userid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  transmitData(userid){
    //user = user;

console.log(userid);
    return userid;
  }

  transmitData2(groupid){
    //user = user;

console.log(groupid);
    return groupid;
  }

  // Group Management

  registerGroup(oGroup) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:4000/api/group', JSON.stringify(oGroup), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getGroups() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({headers: headers});

    return this.http.get(`http://localhost:4000/api/group`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  delGroup(groupid){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:4000/api/group/${groupid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  updateGroup(groupid, oGroup) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`http://localhost:4000/api/group/${groupid}`, JSON.stringify(oGroup), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getGroup(groupid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:4000/api/group/${groupid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

}
