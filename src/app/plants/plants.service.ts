import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './plant.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  private apiUrl = `${environment.apiUrl}/plants`;

  constructor(private http: HttpClient) { }

  getPlants(limit?: number, offset?: number): Observable<Plant[]> {
    let params: { [key: string]: string } = {};
    if (limit !== undefined) {
      params['limit'] = limit.toString();
    }
    if (offset !== undefined) {
      params['offset'] = offset.toString();
    }
    return this.http.get<Plant[]>(this.apiUrl, { params });
  }

  getPlantById(id: string): Observable<Plant> {
    return this.http.get<Plant>(`${this.apiUrl}/${id}`);
  }

  addPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.apiUrl, plant);
  }

  updatePlant(plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.apiUrl}/${plant._id}`, plant);
  }

  deletePlant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
