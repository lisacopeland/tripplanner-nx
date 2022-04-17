import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '@tripplanner-nx/common';
import { Trip } from './trips.model';

export interface TripResponse {
  data: Trip[];
  itemCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(@Inject(API_URL) public apiUrl: string, private http: HttpClient) {}

  query(aid:string, search: Partial<Trip>): Observable<Trip[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchObject: any = search;
    const url = `${this.apiUrl}/${aid}/trips`;
    console.log('going to url ', url, 'search: ', search)
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<Trip[]>(url, { params });
  }

  create(trip: Trip): Observable<Trip> {
    const url = `${this.apiUrl}/${trip.account_id}/trips`;
    return this.http.post<Trip>(url, trip);
  }

  update(trip: Trip): Observable<Trip> {
    const url = `${this.apiUrl}/${trip.account_id}/trips/${trip.id}`;
    return this.http.put<Trip>(url, trip);
  }

  delete(aid: string, id: string): Observable<Trip> {
    const url = `${this.apiUrl}/${aid}/trips/${id}`;
    return this.http.delete<Trip>(url);
  }
}
