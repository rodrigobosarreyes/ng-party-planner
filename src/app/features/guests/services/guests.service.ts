/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Guest } from '../../../core/store/guests/guest.model';

@Injectable({
  providedIn: 'root',
})
export class GuestsService {
  private static readonly BASE_URL = 'https://randomuser.me/api';
  private static readonly USERS_API = `${GuestsService.BASE_URL}/`;
  private static readonly USERS_FIELDS = 'name,email,cell,id,picture';

  constructor(private readonly http: HttpClient) {}

  getGuests(limit = 10): Observable<Guest[]> {
    const params = new HttpParams()
      .set('inc', GuestsService.USERS_FIELDS)
      .set('results', limit);

    return this.http
      .get<{ results: any[] }>(GuestsService.USERS_API, { params })
      .pipe(map(this.mapApiResponseToGuest));
  }

  private mapApiResponseToGuest({ results }: { results: any[] }): Guest[] {
    return results.map((r) => ({
      cellPhone: r.cell,
      email: r.email,
      fullName: `${r.name.first} ${r.name.last}`,
      id: r.id.value ? r.id.value : crypto.randomUUID(),
      isAttendeeConfirmed: null,
      picture: r.picture.large,
    }));
  }
}
