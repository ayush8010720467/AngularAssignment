import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showGif = true;
  private QuestionsDIFJ: Data[];
  private apiUrl = 'https://ca.platform.simplifii.xyz/api/v1/static/assignment5';
  constructor(private route: Router, private http: HttpClient) {
    this.showGif = true;
    this.hitApiForQuestionsForDIFJ();
  }
  hitApiForQuestionsForDIFJ() {
    this.http.get(this.apiUrl).subscribe((response) => {
      // console.log(response['response']['data'][0]);
      this.QuestionsDIFJ = response['response']['data'];
      console.log(this.QuestionsDIFJ.length);
      this.showGif = false;
      this.submit();
    });
  }
  submit() {
    console.log('the function is called');
    console.log(this.QuestionsDIFJ);
  }
  isCheckbox(data: Data) {
    if (data.type === 'checkbox') {
      return true;
    }
    return false;
  }
  isDate(data: Data) {
    if (data.type === 'date') {
      return true;
    }
    return false;
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
