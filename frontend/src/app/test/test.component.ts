import {
  Component,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {  MatTable } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { DemoMaterialModule } from '../../material-module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'test.component',
  standalone: true,
  styleUrls: ['test.component.css'],
  imports: [
    CommonModule,
    CdkTableModule,
    MatTableModule,
    MatSort,
    MatTable,
    DemoMaterialModule,
    HttpClientModule,
  ],
  templateUrl: 'test.component.html',
})
export class TestComponent implements OnInit {
  columnsToDisplay = ['id', 'title'];
  innerDisplayedColumns = ['criteria', 'comparingCondition', 'conditionValue'];

  constructor(private http: HttpClient) {}

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
