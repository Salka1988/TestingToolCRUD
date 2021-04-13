import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTable} from '@angular/material';
import {ItemService} from '../services/item.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Executions} from '../model/executions';
import {Categories} from '../model/categories';
import {Platforms} from '../model/platforms';
import {User} from '../model/user';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.css']
})
export class ExecutionsComponent implements OnInit {

  public itemsPerPage = 12;
  public selectedPage = 0;

  public users: User[] = [];
  public executions: Executions[] = [];
  public categories: Categories[] = [];
  public platforms: Platforms[] = [];


  columnsToDisplay = ['dateofexecution', 'version', 'platforms', 'device', 'categories', 'user'];

  @ViewChild(MatTable) executionsTable: MatTable<any>;
  @ViewChild(MatPaginator) executionsPaginator: MatPaginator;


  constructor(private itemService: ItemService, private router: Router, private authService: AuthService
    , public zone: NgZone
  ) {
  }

  ngOnInit() {

    this.zone.run(() => {});

    this.itemService.getExecutions().subscribe(executions => {
      this.executions = executions;
      this.executionsPaginator.length = this.executions.length;
    });

    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.itemService.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });

    this.executionsPaginator.pageSize = this.itemsPerPage;

    this.executionsPaginator.page.subscribe(event => {
      if (this.itemsPerPage != event.pageSize) {
        this.changePageSize(event.pageSize);
      } else {
        this.changePage(event.pageIndex);
      }
    });

    this.itemService.getUsers().subscribe(users => {
      this.users = users;
    });

  }


  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.itemsPerPage = Number(newSize);
    this.changePage(0);
  }

  get executionsCases() {
    const pageIndex = this.selectedPage * this.itemsPerPage;
    if (this.executions === undefined) {
      return [];
    } else {
      return this.executions.slice(pageIndex, pageIndex + this.itemsPerPage);
    }
  }

  getCategoryName(categoryId: string): string {
    let title = '';
    this.categories.forEach(category => {
      if (category.id === categoryId) { title = category.title; }
    });
    return title;
  }


  getPlatform(platformId: string) {
    let result = null;
    this.platforms.forEach(platform => {
      if (platform.id === platformId) { result = platform; }
    });
    return result;
  }


  getUserName(userId: string) {
    let name = null;
    this.users.forEach(user => {
      if (user.id === userId) { name = user.displayName; }
    });
    return name;
  }


}
