import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  retrieveImages(query: string, page: number) {
    return this.http.get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=orGQOLX5K6XH3FpnGpYwfsOpAe5ukQHeu-p59IDAp_g`
    );
  }
}
