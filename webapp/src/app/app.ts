import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterOutlet,Header,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webapp');
}
