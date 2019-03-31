import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import * as moment from 'moment';

@Component({
  selector: 'app-secim-ekrani',
  templateUrl: './secim-ekrani.component.html',
  styleUrls: ['./secim-ekrani.component.sass']
})
export class SecimEkraniComponent implements OnInit {

  constructor(
    private afDb: AngularFireDatabase
  ) { }

  public defSettings: any = {
    main: {
      backgroundColor: '#DEDEDE'
    },
    logo: {
      marginTop: '30px',
      marginRight: '60px',
      width: '100px'
    }
  };

  dateTime: Date = new Date();

  public settings: any = {};

  getStyle(name: string) {
    return this.settings[name] || {};
  }

  getTime() {
    return moment(this.dateTime).format('HH:MM');
  }

  ngOnInit() {
    this.afDb.object('/ayarlar').valueChanges().subscribe(l => this.settings = Object.assign(this.defSettings, l));

    setInterval(() => this.dateTime = new Date(), 1000);
  }

}
