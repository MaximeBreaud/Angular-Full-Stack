import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { TeamsComponent } from '../teams/teams.component';
import { Team } from '../shared/models/team.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  teams: Team[] = [];
  players: { name: string, img: string, flag: string }[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.teamService.getTeams().subscribe(
      data => {
        this.teams = data
        this.createPlayersList();
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  createPlayersList() {
    this.players = [];

    for (let team of this.teams) {
      for (let player of team.players) {
        this.players.push({ name: player.name, img: team.img, flag: team.flag });
      }
    }

    this.players = this.players.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
}
