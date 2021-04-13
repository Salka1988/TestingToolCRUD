import {Component, OnInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

  originalLeftNavItems = [
    {name: 'Test Runs', auth: true, dest: '/executions'},
    {name: 'Test Cases', auth: true, dest: '/testcases'},
    {name: 'Categories', auth: true, dest: '/categories'}

  ];

  originalRightNavItems = [
    {name: 'Sign Out', auth: true,  dest: '/login?force'}
  ];

  leftNavItems = [];

  rightNavItems = [];

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {}

  ngOnInit () {
    this.authService.observableUser.subscribe(user => {
      this.leftNavItems = [];
      this.originalLeftNavItems.forEach(item => {
        if (item.auth && user !== null) {
          this.leftNavItems.push(item);
        } else if (!item.auth) {
          this.leftNavItems.push(item);
        }
      });

      this.rightNavItems = [];
      this.originalRightNavItems.forEach(item => {
        if (item.auth && user !== null) {
          this.rightNavItems.push(item);
        } else if (!item.auth) {
          this.rightNavItems.push(item);
        }
      });
    });
  }

}
