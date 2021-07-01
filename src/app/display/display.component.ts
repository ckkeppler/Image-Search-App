import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  @Input() images: any[];
  @Input() errorMessage: string;
  @Input() totalImages: number;
  @Input() notFound: boolean;

  constructor() {}

  ngOnInit(): void {}
}
