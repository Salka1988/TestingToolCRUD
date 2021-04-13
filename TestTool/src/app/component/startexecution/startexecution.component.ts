import {AfterViewInit, Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ItemService} from '../../services/item.service';
import {AuthService} from '../../services/auth.service';
import {ExecutionTestCase, Testcase} from '../../model/testcase';
import {Executions} from '../../model/executions';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTable} from '@angular/material';
import {Categories} from '../../model/categories';
import {Platforms} from '../../model/platforms';
import {User} from '../../model/user';
import {a} from '@angular/core/src/render3';

@Component({
  selector: 'app-startexecution',
  templateUrl: './startexecution.component.html',
  styleUrls: ['./startexecution.component.css']
})

@Injectable()
export class StartexecutionComponent implements OnInit {

  public execID = '';
  public testcases_for_exec: Testcase[] = [];
  public exec: Executions;


  public users: User[] = [];
  public categories: Categories[] = [];
  public platforms: Platforms[] = [];

  public itemsPerPage = 12;
  public selectedPage = 0;

  public array = [];

  columnsToDisplay = ['title', 'comment', 'status'];

  @ViewChild(MatTable) startexecutionTable: MatTable<any>;
  @ViewChild(MatPaginator) startexecutionPaginator: MatPaginator;


  constructor(private itemService: ItemService,
              private authService: AuthService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.execID = this.route.snapshot.paramMap.get('executionId');

    this.itemService.getExecution(this.execID).subscribe(data => {
      this.exec = data;
    });

    this.itemService.getSpecificExecutionList(this.execID).subscribe(testcases => {
      this.testcases_for_exec = testcases;
      this.startexecutionPaginator.length = this.testcases_for_exec.length;
    });

    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.itemService.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });


    this.startexecutionPaginator.page.subscribe(event => {
      if (this.itemsPerPage !== event.pageSize) {
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


  get testCasesForExec() {
    if (this.testcases_for_exec === undefined) {
      return [];
    } else {

      return this.testcases_for_exec;
    }
  }


  getNumberOfTestcases() {
    return this.testcases_for_exec.length;
  }


  get getExecution() {
    return this.exec;
  }


  getPlatform(platformId: string) {
    let result = null;
    this.platforms.forEach(platform => {
      if (platform.id === platformId) {
        result = platform;
      }
    });
    return result;
  }


  getCategoryName(categoryId: string): string {
    let title = '';
    this.categories.forEach(category => {
      if (category.id === categoryId) {
        title = category.title;
      }
    });
    return title;
  }


  getUserName(userId: string) {
    let name = null;
    this.users.forEach(user => {
      if (user.id === userId) {
        name = user.displayName;
      }
    });
    return name;
  }

}
