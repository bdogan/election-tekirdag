import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-line-yazi',
  templateUrl: './line-yazi.component.html',
  styleUrls: ['./line-yazi.component.sass']
})
export class LineYaziComponent implements OnInit {

  @Input() value = '';

  @Input() style = {};

  @Input() color = 'black';

  constructor() { }

  getStyle() {
    return Object.assign(
      this.style,
      {
        background: 'linear-gradient(180deg, #7079A6 0%, #060711 50.83%, #10113D 100%)'
      }
    );
  }

  ngOnInit() {
  }

}
