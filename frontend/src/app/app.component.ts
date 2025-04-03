import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog Assignment';
}
