import { Component } from '@angular/core';
import { Auth} from '../../services/auth';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  authservice=Inject(Auth);
}
