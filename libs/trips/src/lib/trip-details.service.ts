import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../../../common/src/lib/constants';
import { TripDetail } from '@tripplanner-nx/trips';

export interface TripDetailResponse {
  data: TripDetail[];
  itemCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TripDetailsService {
  constructor(@Inject(API_URL) public apiUrl, private http: HttpClient) {}

  query(aid:string, tripId: string, search: Partial<TripDetail>): Observable<TripDetail[]> {
    const searchObject: any = search;

    const url = `${this.apiUrl}/${aid}/trips/${tripId}/tripdetails`;
    console.log('going to url ', url, 'search: ', search)
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<TripDetail[]>(url, { params });
  }

  create(aid: string, tripId: string, tripDetail: TripDetail): Observable<TripDetail> {
    const url = `${this.apiUrl}/${aid}/trips/${tripId}/tripdetails`;
    return this.http.post<TripDetail>(url, tripDetail);
  }

  update(aid: string, tripId: string, tripDetail: TripDetail): Observable<TripDetail> {
    const url = `${this.apiUrl}/${aid}/trips/${tripId}/tripdetails/${tripDetail.id}`;
    return this.http.put<TripDetail>(url, tripDetail);
  }

  delete(aid: string, tripId: string, tripDetailId: string): Observable<TripDetail> {
    const url = `${this.apiUrl}/${aid}/trips/${tripId}/tripdetails/${tripDetailId}`;
    return this.http.delete<TripDetail>(url);
  }
}
