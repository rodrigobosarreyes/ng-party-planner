import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Guest } from '../../../core/stores/guest';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  public static readonly GUEST_API_URL = 'https://randomuser.me/api';

  constructor(private readonly http: HttpClient) {}

  getAllUsers(): Observable<Array<Guest>> {
    const params = new HttpParams().set('results', 10);
    return this.http
      .get<any>(GuestService.GUEST_API_URL, { params })
      .pipe(map(this.mapApiResponseToGuest));
  }

  private mapApiResponseToGuest({ results }: { results: any[] }): Guest[] {
    return results.map((r) => ({
      cellPhone: r.cell,
      email: r.email,
      fullName: `${r.name.first} ${r.name.last}`,
      id: r.id.value,
      isAttendeeConfirmed: null,
      picture: r.picture.medium,
    }));
  }
}
