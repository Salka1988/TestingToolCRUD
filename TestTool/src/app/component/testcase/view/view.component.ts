import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {Testcase} from '../../../model/testcase';
import {Executions} from '../../../model/executions';
import {Categories} from '../../../model/categories';

@Component({
  selector: 'view-test-case',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewTestCaseComponent implements OnInit {

  public testCaseId = null;
  public testCase: Testcase;
  public categories: Categories[] = [];
  // public executions: Executions[] = null;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {
  }

  ngOnInit() {

    this.testCaseId = this.route.snapshot.paramMap.get('testCaseId');


    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });


    this.itemService.getOneTestcase(this.testCaseId).subscribe(
      val => {
        this.testCase = val.data();
      });




  }

  getCategoryName(categoryId: string): string {
    let title = '';
    this.categories.forEach(category => {
      if (category.id === categoryId) { title = category.title; }
    });
    return title;
  }


  get getTestcase() {
    return this.testCase;
  }


}
