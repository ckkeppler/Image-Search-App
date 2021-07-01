import { Component, OnDestroy, OnInit } from '@angular/core';

import { SearchService } from '../search.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  public images: [];
  query: string;
  page: number = 1;
  totalPages: number = 0;
  errorMessage: string;
  notFound: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.images = [];
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.query = form.value.query;
    this.getImages(this.query, this.page);
    form.reset();
  }

  getImages(query: string, page: number) {
    this.searchService
      .retrieveImages(query, page)
      .pipe(
        map((resData) => {
          console.log(resData);
          const newArray = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              newArray.push(resData[key]);
            }
          }
          return newArray;
        })
      )
      .subscribe(
        (res) => {
          this.images = res[2];
          console.log(this.images);
          this.totalPages = res[1];
          this.notFound = false;
          if (this.totalPages === 0) {
            this.notFound = true;
          }
          console.log(this.notFound);
        },
        (err) => (this.errorMessage = err.message)
      );
  }

  nextPage() {
    this.page++;
    this.getImages(this.query, this.page);
  }

  prevPage() {
    if (this.page !== 1) {
      this.page--;
      this.getImages(this.query, this.page);
    }
  }

  getPage(page: number) {
    this.page = page;
    if (this.query != '') {
      this.getImages(this.query, this.page);
    } else window.alert('Please enter a search');
  }
}
