import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { signal, computed } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

async function logMovies() {
  let json = {};
  const response = await fetch('http://localhost:8080/api/filters', {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      json = data;
    });
  return json;
}

@Component({
  selector: 'homePage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // httpClient = Inject(HttpClient);
  data: any = [];
  dataMain: any = [];
  ngOnInit(): void {
    this.fetchData();
    this.fetchDataMain();
  }

  fetchData() {
    this.http
      .get('http://localhost:8080/api/criteria')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
  }

  fetchDataMain() {
    this.http
      .get('http://localhost:8080/api/filters')
      .subscribe((data: any) => {
        console.log(data);
        this.dataMain = data;
      });
  }
}
