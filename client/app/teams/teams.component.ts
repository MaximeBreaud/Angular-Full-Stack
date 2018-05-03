import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TeamService } from '../services/team.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Team } from '../shared/models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {

  team = new Team();
  teams: Team[] = [];
  isLoading = true;
  isEditing = false;

  addTeamForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private teamService: TeamService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getTeams();
    this.addTeamForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe(
      data => this.teams = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addTeam() {
    this.teamService.addTeam(this.addTeamForm.value).subscribe(
      (res) => {
        this.teams.push(res);
        this.addTeamForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(team: Team) {
    this.isEditing = true;
    this.team = team;
  }

  cancelEditing() {
    this.isEditing = false;
    this.team = new Team();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the teams to reset the editing
    this.getTeams();
  }

  editTeam(team: Team) {
    this.teamService.editTeam(team).subscribe(
      () => {
        this.isEditing = false;
        this.team = team;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteTeam(team: Team) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.teamService.deleteTeam(team).subscribe(
        () => {
          const pos = this.teams.map(elem => elem._id).indexOf(team._id);
          this.teams.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
