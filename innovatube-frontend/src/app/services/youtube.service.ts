import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyATXonteO1hged-hn2Dcm26zEVKvFvDxnE';
  private baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  saveFavorite(data: any): Observable<any> {
    return this.http.post('https://innovatube-production.up.railway.app/api/favorites', data);
  }
  
  getFavorites(username: string): Observable<any> {
    return this.http.get(`https://innovatube-production.up.railway.app/api/favorites/${username}`);
  }
  
  removeFavorite(data: any): Observable<any> {
    return this.http.request('delete', 'https://innovatube-production.up.railway.app/api/favorites', { body: data });
  }
  
  searchVideos(query: string): Observable<any> {
    
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('key', this.apiKey)
      .set('maxResults', '10')
      .set('type', 'video');

    return this.http.get(this.baseUrl, { params });
  }
}
