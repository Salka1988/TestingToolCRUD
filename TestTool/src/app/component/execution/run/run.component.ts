import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExecutionTestCase, Testcase} from '../../../model/testcase';
import {Executions} from '../../../model/executions';
import {ItemService} from '../../../services/item.service';
import {AuthService} from '../../../services/auth.service';
import {Categories} from '../../../model/categories';
import {Platforms} from '../../../model/platforms';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';
import {promise} from 'selenium-webdriver';
import {StartexecutionComponent} from '../../startexecution/startexecution.component';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})


@Injectable()
export class RunExecutionComponent implements OnInit {

  public execID = '';

  public specificTestcaseId = '';
  public testcases_for_exec: ExecutionTestCase = null;

  public exec: Executions;

  public counter = 0;
  public categories: Categories[] = [];
  public platforms: Platforms[] = [];

  public datalength = 0;

  selectedIndex = 0;

  steps: string = null;

  SKIPPED = 'SKIPPED';
  SUCCEEDED = 'SUCCEEDED';
  FAILED = 'FAILED';


  constructor(private itemService: ItemService, private authService: AuthService, private route: ActivatedRoute,
              private router: Router) {

  }

  get getExecution() {
    return this.exec;
  }

  ngOnInit() {

    this.execID = this.route.snapshot.paramMap.get('executionId');

    this.specificTestcaseId = this.route.snapshot.paramMap.get('testCaseId');

    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.itemService.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });

    this.itemService.getExecution(this.execID).subscribe(item => {
      this.exec = item;
    });

    if (this.specificTestcaseId == null) {
      this.itemService.getExecutionTestcase(this.execID).subscribe(data => {
        this.testcases_for_exec = data[0];

        if (this.testcases_for_exec === undefined) {
          this.itemService.getSkippedExecutionTestcase(this.execID).subscribe(test => {
            this.testcases_for_exec = test[0];

            if (this.testcases_for_exec === undefined) {
              this.router.navigate(['/execution/' + this.getExecution.id]);
            }
          });
        }
      });
    } else {

      this.itemService.getOneExecutionTestcase(this.execID,
        this.specificTestcaseId).subscribe(
        val => {
          this.testcases_for_exec = val.data();
          this.testcases_for_exec.id = this.specificTestcaseId;
        });
    }


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


  updateCommentAndState(executionID: string, testcaseID: string, comment: string, state: string) {

    this.itemService.updateExecutionTestcase(executionID, testcaseID, comment, state);
    if (this.specificTestcaseId != null) {
      this.router.navigate(['/execution/' + this.execID]);
    }


  }




}















