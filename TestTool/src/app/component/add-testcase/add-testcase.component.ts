import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Testcase } from '../../model/testcase';

import {Location} from '@angular/common';
import {Platforms} from '../../model/platforms';
import {Categories} from '../../model/categories';


@Component({
  selector: 'app-add-testcase',
  templateUrl: './add-testcase.component.html',
  styleUrls: ['./add-testcase.component.css']
})
export class AddTestcaseComponent implements OnInit {


  categories: Categories[] = [];
  platforms: Platforms[] = [];

  toggleform = false;


  add_testcase: Testcase = {
    title: '',
    precondition: '',
    teststeps: '',
    expected_results: '',
    platforms: [],
    categories: [],
    description: '',
    active: true
  };

  constructor(private itemservices: ItemService, private _location: Location) {

    this.itemservices.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });
    this.itemservices.getCategories().subscribe(categories => {
      this.categories = categories;
    });

  }

  ngOnInit() {
    this.itemservices.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });
    this.itemservices.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


  onSubmit() {
    if (this.add_testcase.title !== '' &&  this.add_testcase.precondition !== '' &&
          this.add_testcase.teststeps !== '' &&  this.add_testcase.expected_results !== '' &&
          this.add_testcase.platforms !== [] && this.add_testcase.categories !== []
          ) {

      this.itemservices.addTestcase(this.add_testcase);


      this.add_testcase.title = '';
      this.add_testcase.precondition = '';
      this.add_testcase.teststeps = '';
      this.add_testcase.expected_results = '';
      this.add_testcase.platforms = [];
      this.add_testcase.categories = [];
      this.add_testcase.description = '';
      this._location.back();

    }
  }

  addPlatform(val) {
    const place = this.add_testcase.platforms.indexOf(val);
    if (place === -1) {
      // val not found, pushing onto array
      this.add_testcase.platforms.push(val);
      console.log(val);
    } else {
      // val is found, removing from array
      this.add_testcase.platforms.splice(place);
      console.log(place);
    }
  }

  addCategory(val) {
    const place = this.add_testcase.categories.indexOf(val);
    if (place === -1) {
      // val not found, pushing onto array
      this.add_testcase.categories.push(val);
      console.log(val);
    } else {
      // val is found, removing from array
      this.add_testcase.categories.splice(place);
      console.log(place);
    }
  }


}
