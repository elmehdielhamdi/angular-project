import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(private auth: AuthService, private http: HttpClient) {}

  recipes: any = null;

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list';
    const options = {
      params: {
        from: Math.floor(Math.random() * 399),
        size: '20',
        tags: 'under_45_minutes',
      },
      headers: {
        'X-RapidAPI-Key': '47e6d18d5bmsheb75ec393d80943p13a796jsn38fb48ea17a6',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    };

    await this.http.get<any>(url, options).subscribe((response) => {
      this.recipes = response.results;
      console.log(response);
    });
  }

  logout() {
    this.auth.logout();
  }
}
