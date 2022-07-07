import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-recipe-layout',
  templateUrl: './recipe-layout.component.html',
  styleUrls: ['./recipe-layout.component.css'],
})
export class RecipeLayoutComponent implements OnInit {
  user = JSON.parse(<any>localStorage.getItem('user'));

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.user);
  }

  logout() {
    this.auth.logout();
  }
}
