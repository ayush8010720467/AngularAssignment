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
      console.log(typeof this.QuestionsDIFJ[1].value);
      this.showGif = false;
      // for now we are hardcoding the correction in API
      this.QuestionsDIFJ[1].showIf.field = 'dob';
      this.QuestionsDIFJ[1].showIf.value = '2001-01-01';
    });
  }
  submit() {
    console.log('the function submit is called');
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
  isButton(data: Data) {
    if (data.type === 'button') {
      return true;
    }
    return false;
  }
  search(showif: ShowIf): number {
    for (let i = 0; i < this.QuestionsDIFJ.length; i++) {
      if (this.QuestionsDIFJ[i].name === showif.field) {
        return i;
      }
    }
    // if the field is not found then return -1
    return -1;
  }
  toBeShown(question: Data): boolean {
    if (question.showIf == null) {
      return true;
    } else {
      // use the search function to get the index of the perticular field
      let index;
      index = this.search(question.showIf);
      if (index === -1) {
        // not found
        return true;
      } else {
        if (this.QuestionsDIFJ[index].value === question.showIf.value) {
          return true;
        }
      }
    }
    return false;
  }
  showData() {
    console.log(this.QuestionsDIFJ[0].value);
  }
  showCheckbox(question: Data): boolean {
    return this.isCheckbox(question) && this.toBeShown(question);
  }
  showDate(question: Data): boolean {
    return this.isDate(question) && this.toBeShown(question);
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
  value: any;
}
