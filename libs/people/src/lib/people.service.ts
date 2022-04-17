import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '@tripplanner-nx/common';
import { Person } from './people.model';

export interface PeopleResponse {
  data: Person[];
  itemCount: number;
}

// To get all of the trips someone is on, you need to scan

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(@Inject(API_URL) public apiUrl, private http: HttpClient) {}

  query(aid:string, search: Partial<Person>): Observable<Person[]> {
    const searchObject: any = search;
    const url = `${this.apiUrl}/${aid}/people`;
    console.log('going to url ', url, 'search: ', search)
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<Person[]>(url, { params });
  }

  create(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.account_id}/people`;
    return this.http.post<Person>(url, person);
  }

  update(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.account_id}/people/${person.id}`;
    return this.http.put<Person>(url, person);
  }

  delete(aid: string, id: string): Observable<Person> {
    const url = `${this.apiUrl}/${aid}/people/${id}`;
    return this.http.delete<Person>(url);
  }
}
