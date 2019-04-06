import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiUrl = 'https://ca.platform.simplifii.xyz/api/v1/static/assignment5';
  constructor(private route: Router, private http: HttpClient) {
    this.hitApiForQuestionsForDIFJ();
  }
  hitApiForQuestionsForDIFJ() {
    this.http.get(this.apiUrl).subscribe((response) => {
      console.log(response);
      console.log('got the response');
    });
  }
}
