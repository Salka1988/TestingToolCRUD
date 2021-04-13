import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../services/item.service';
import {Executions} from '../../model/executions';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';



import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-executions',
  templateUrl: './addexecution.component.html',
})
export class AddexecutionComponent implements OnInit {


  platform_to_chose = [];
  categories_to_chose = [];

  add_execution: Executions = {
    userid: '',
    dateofexecution: null,
    platform: '',
    version: '',
    device: '',
    categories: [],

  };


  myControl = new FormControl();


  constructor(private itemservices: ItemService, private authService: AuthService, private router: Router) {

    this.itemservices.getPlatforms().subscribe(platforms => {
      this.platform_to_chose = platforms;
    });

    this.itemservices.getCategories().subscribe(categories => {
      this.categories_to_chose = categories;
    });


  }


  ngOnInit() {
    this.itemservices.getPlatforms().subscribe(platforms => {
      this.platform_to_chose = platforms;
    });
    this.itemservices.getCategories().subscribe(categories => {
      this.categories_to_chose = categories;
    });
  }


  onSubmit() {
    if (
      this.add_execution.version !== '' && this.add_execution.device !== '' && this.add_execution.categories !== []
      && this.add_execution.platform !== '') {

      this.add_execution.userid = this.authService.user.uid;
      this.add_execution.dateofexecution = Timestamp.now();

      this.itemservices.addExecution(this.add_execution).then(ref => {
        console.log('The execution was added with id ', ref.id);
        this.router.navigate(['/execution/' + ref.id], { replaceUrl: true });
      });

      this.resetInputs();
    }

  }

  resetInputs() {
    this.add_execution.userid = '';
    this.add_execution.dateofexecution = null;
    this.add_execution.version = '';
    this.add_execution.device = '';
    this.add_execution.categories = [];
  }

  addCategory(val) {
    const place = this.add_execution.categories.indexOf(val);
    if (place === -1) {
      // val not found, pushing onto array
      this.add_execution.categories.push(val);
    } else {
      // val is found, removing from array
      this.add_execution.categories.splice(place);
    }
  }

  selectChangeHandler(event: any) {
    let categoryId = '';
    this.platform_to_chose.forEach(category => {
      if (category.title ===  event.option.value) { categoryId = category.id; }
    });
    this.add_execution.platform = categoryId;
  }


}
