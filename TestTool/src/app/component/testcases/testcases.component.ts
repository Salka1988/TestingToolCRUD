import {Component, OnInit, Output, EventEmitter, NgZone, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/table';

import {ItemService} from '../../services/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Testcase} from '../../model/testcase';
import {isBoolean} from 'util';
import {AuthService} from '../../services/auth.service';
import {Categories} from '../../model/categories';
import {MatPaginator, MatTable} from '@angular/material';
import {Platforms} from '../../model/platforms';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css']

})
export class TestcasesComponent implements OnInit {
  public itemsPerPage = 12;
  public selectedPage = 0;

  public categoryId = '';



  public testcases: Testcase[] = [];
  public categories: Categories[] = [];
  public platforms: Platforms[] = [];

  @ViewChild(MatTable) testcasesTable: MatTable<any>;
  @ViewChild(MatPaginator) testcasePaginator: MatPaginator;


  columnsToDisplay = ['title', 'description', 'categories', 'platforms'];

  constructor(private itemService: ItemService,
              private router: Router, private route: ActivatedRoute,
              private authService: AuthService,
              ) {
  }

  ngOnInit() {


    this.categoryId = this.route.snapshot.paramMap.get('categoryId');


    this.itemService.getTestcases().subscribe(testcase => {
      this.testcases = testcase;
      this.testcasePaginator.length = this.testcases.length;
    });


    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.itemService.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });

    this.testcasePaginator.pageSize = this.itemsPerPage;

    this.testcasePaginator.page.subscribe(event => {
      if (this.itemsPerPage != event.pageSize) {
        this.changePageSize(event.pageSize);
      } else {
        this.changePage(event.pageIndex);
      }
    });


  }
  get testCases() {
    const pageIndex = this.selectedPage * this.itemsPerPage;
    if (this.testcases === undefined) {
      return [];
    } else {

      if (this.categoryId !== null) {
      this.testcases = this.testcases.filter(a => {
         return a.categories.includes(this.categoryId);
        });
        return this.testcases.slice(pageIndex, pageIndex + this.itemsPerPage);
      }
      return this.testcases.slice(pageIndex, pageIndex + this.itemsPerPage);
    }
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }


  changePageSize(newSize: number) {
    this.itemsPerPage = Number(newSize);
    this.changePage(0);
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



}
