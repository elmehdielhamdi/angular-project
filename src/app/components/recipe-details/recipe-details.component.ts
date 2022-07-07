import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  id: any = null;
  recipe: any = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  async getData() {
    const url = 'https://tasty.p.rapidapi.com/recipes/get-more-info';
    const options = {
      params: { id: this.id },
      headers: {
        'X-RapidAPI-Key': '47e6d18d5bmsheb75ec393d80943p13a796jsn38fb48ea17a6',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    };

    this.http.get<any>(url, options).subscribe((response) => {
      this.recipe = response;
    });
  }
  logout() {
    this.auth.logout();
  }
}
