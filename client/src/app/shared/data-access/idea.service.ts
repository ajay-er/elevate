import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private api = environment.apiUrl;
  private http = inject(HttpClient);

  getAllIdeas() {
    return this.http.get(`${this.api}/ideas/all`);
  }

  createIdea(caption:string) {
    return this.http.post(`${this.api}/ideas/create`,{ caption });
  }

  fetchCurrentIdea(id:string) {
    return this.http.get(`${this.api}/ideas/${id}`);
  }

  addComment(text:string, ideaId:string) {
    return this.http.post(`${this.api}/ideas/comments/add`,{text,ideaId});
  }

  like(ideaId:string) {
    return this.http.patch(`${this.api}/ideas/like`,{ideaId});
  }

  dislike(ideaId:string) {
    return this.http.patch(`${this.api}/ideas/dislike`,{ideaId});
  }
}
