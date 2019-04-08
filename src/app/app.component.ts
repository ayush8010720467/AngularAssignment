import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showGif = true;
  private QuestionsDIFJ: Data[];
  // private apiUrl = 'https://ca.platform.simplifii.xyz/api/v1/static/assignment5';
  private apiUrl = 'https://api.myjson.com/bins/140ui4';
  constructor(private route: Router, private http: HttpClient) {
    this.showGif = true;
    this.hitApiForQuestionsForDIFJ();
  }
  ngOnInit() {
    this.showGif = true;
    this.hitApiForQuestionsForDIFJ();
  }
  hitApiForQuestionsForDIFJ() {
    this.http.get(this.apiUrl).subscribe((response) => {
      // console.log(response['response']['data'][0]);
      this.QuestionsDIFJ = response['response']['data'];
      console.log(typeof this.QuestionsDIFJ[1].value);
      this.showGif = false;
      // for now we are hardcoding the correction in API as the perticular API has the error
      // this.QuestionsDIFJ[1].showIf.field = 'dob';
      // this.QuestionsDIFJ[1].showIf.value = '2001-01-01';
    });
  }
  submit() {
    // check if all the validations are fullfiled first then prepare for posting the response of the form
    this.showGif = true;
    let dataModel: any = {};
    // now place the key , value pair in it
    for (let i = 0; i < this.QuestionsDIFJ.length - 1; i++) {
      dataModel[this.QuestionsDIFJ[i].name] = this.QuestionsDIFJ[i].value;
    }
    console.log('the function submit is called');
    console.log(dataModel);
    this.http.post(this.QuestionsDIFJ[this.QuestionsDIFJ.length - 1].api.uri, dataModel).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        this.showGif = true;
        alert('Answers have been submited');
        this.ngOnInit();
      },
      error => {

        console.log('Error', error);

      }

    );
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
  convert(question) {
    let date = new Date(question.value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    question.value = [date.getFullYear(), mnth, day].join("-");
  }
  showData() {
    console.log(typeof this.QuestionsDIFJ[0].value);
  }
  showCheckbox(question: Data): boolean {
    return this.isCheckbox(question) && this.toBeShown(question);
  }
  showDate(question: Data): boolean {
    return this.isDate(question) && this.toBeShown(question);
  }
  checkDatepickerValidation(question: Data): boolean {
    if (question.validations == null) {
      return true;
    } else {
      if (question.validations[0].name === 'required') {
        if (question.value != null && question.value !== 'undefined' && question.value !== 'NaN-aN-aN') {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  validateForSubmitButton(): boolean {
    for (let i = 0; i < this.QuestionsDIFJ.length - 1; i++) {
      if (this.checkDatepickerValidation(this.QuestionsDIFJ[i]) === false) {
        return true;
      }
    }
    return false;
  }
  datepickerHasError(question: Data): boolean {
    return !this.checkDatepickerValidation(question);
  }
}
interface Validation {
  name: string;
  message: string;
  value: any;
}
interface ShowIf {
  field: string;
  value: any;
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
