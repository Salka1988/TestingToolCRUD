import {Component, Inject, OnInit} from '@angular/core';
import {ItemService} from '../../services/item.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Categories} from '../../model/categories';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Categories[] = [];

  columnsToDisplay = ['categories'];

  addCategory: Categories = {
    title: ''
  };

  addCategoryForm;

  constructor(private itemService: ItemService,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.addCategoryForm = new FormGroup({
      'name': new FormControl(this.addCategory.title, [
        Validators.required,
        this.isDuplicated()
      ])
    });

    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  save() {

    if (this.addCategory.title !== '') {
      this.itemService.addNewCategory(this.addCategory);
    }

    this.addCategory.title = '';
  }

  get categoriesList() {
    return this.categories;
  }

   isDuplicated(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

      const hasTag = this.categories.some(a => {
        return a.title.toUpperCase() === control.value.toString().trim().toUpperCase();
      }) === true;


      return hasTag ? {duplicateTags: true} : null;
    };
  }



}

