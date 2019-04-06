import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private QuestionsDIFJ: Data[];
  private apiUrl = 'https://ca.platform.simplifii.xyz/api/v1/static/assignment5';
  constructor(private route: Router, private http: HttpClient) {
    this.hitApiForQuestionsForDIFJ();
  }
  hitApiForQuestionsForDIFJ() {
    this.http.get(this.apiUrl).subscribe((response) => {
      // console.log(response['response']['data'][0]);
      this.QuestionsDIFJ = response['response']['data'];
      console.log(this.QuestionsDIFJ);
      this.submit();
    });
  }
  submit() {
    console.log('the function is called');
    console.log(this.QuestionsDIFJ);
  }
}
interface Validation {
  name: string;
  message: string;
  value: string;
}
interface ShowIf {
  field: string;
  value: string;
}
interface Api {
  uri: string;
  method: string;
  authEnabled: boolean;
}
interface Data {
  type: string;
  lable: string;
  inputType: string;
  name: string;
  validations: Validation[];
  showIf: ShowIf;
  action: string;
  api: Api;
}
