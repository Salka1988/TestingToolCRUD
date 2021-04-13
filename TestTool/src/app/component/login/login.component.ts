import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {ItemService} from '../../services/item.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;

  userData: User = {
    displayName: '',
    email: '',
    photoURL: ''
  };

  app_name = '';
  wrong_user_message = '';

  constructor(private angularAuth: AngularFireAuth, private authService: AuthService,
              private router: Router, private route: ActivatedRoute,
              private itemService: ItemService,
              public zone: NgZone) {


  }

  ngOnInit() {

    this.app_name = 'FITAPP Test Tool';

    this.zone.run(() => {});

    if (this.route.snapshot.queryParamMap.has('force')) {
      this.authService.logout();
    }

  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {

        this.userData.displayName = res.user.displayName;
        this.userData.email = res.user.email;
        this.userData.photoURL = res.user.photoURL;

        this.user = res.user;
        const mail = this.user.email.split('@');
        if (mail[1] === 'fitapp.info') {
          this.wrong_user_message = '';
          this.itemService.setUser(res.user.uid, this.userData);

          this.zone.run(() => { this.router.navigate(['/']); });

          // this.router.navigate(['/']);

        } else {
          this.wrong_user_message = 'Please sign in with your fitapp account.';
          this.authService.logout();
        }
      }).catch((err) => console.log(err));

  }



}
