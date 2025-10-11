import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  constructor(public authservice: Auth) {}
}
