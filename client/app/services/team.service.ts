import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Team } from '../shared/models/team.model';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('/api/teams');
  }

  countTeams(): Observable<number> {
    return this.http.get<number>('/api/teams/count');
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>('/api/team', team);
  }

  getTeam(team: Team): Observable<Team> {
    return this.http.get<Team>(`/api/team/${team._id}`);
  }

  editTeam(team: Team): Observable<string> {
    return this.http.put(`/api/team/${team._id}`, team, { responseType: 'text' });
  }

  deleteTeam(team: Team): Observable<string> {
    return this.http.delete(`/api/team/${team._id}`, { responseType: 'text' });
  }

}
