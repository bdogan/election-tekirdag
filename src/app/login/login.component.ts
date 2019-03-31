import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {filter, first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  fg: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  ngOnInit() {
    this.afAuth.authState.pipe(first(), filter(u => !!u)).subscribe(() => this.router.navigate(['/']));
  }

  login() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.fg.value.email, this.fg.value.password)
      .then(() => this.router.navigate(['/']))
      .catch(err => alert(err.message));

  }
}
