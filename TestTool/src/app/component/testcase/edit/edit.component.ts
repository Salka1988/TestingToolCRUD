import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {Testcase} from '../../../model/testcase';
import {Categories} from '../../../model/categories';
import {Platforms} from '../../../model/platforms';
import {Location} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConfirmDeleteDialogComponent} from './delete-box/confirm-delete-dialog.component';


@Component({
  selector: 'edit-test-case',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditTestCaseComponent implements OnInit {

  public testCaseId = null;
  public testCase: Testcase = null;
  public updateTestcase: Testcase = null;

  public categories: Categories[] = [];
  public platforms: Platforms[] = [];


  constructor(private route: ActivatedRoute,  private itemService: ItemService,
              private _location: Location, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {



    this.testCaseId = this.route.snapshot.paramMap.get('testCaseId');


    this.itemService.getOneTestcase(this.testCaseId).subscribe(
      val => {
        this.testCase = val.data();
      });
    this.itemService.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });
    this.itemService.getCategories().subscribe(categories => {
      this.categories = categories;
    });


  }


  onSubmit() {
    // Maybe i could add some terms

      this.itemService.updateTestcase(this.testCaseId, this.testCase);
      this._location.back();


    }

  addPlatform(val) {
    const place = this.testCase.platforms.indexOf(val);
    if (place === -1) {
      this.testCase.platforms.push(val);
    } else {

      this.testCase.platforms.splice(this.testCase.platforms.indexOf(val), 1);
    }

  }

  addCategory(val) {
    const place = this.testCase.categories.indexOf(val);
    if (place === -1) {
      this.testCase.categories.push(val);
    } else {
      this.testCase.categories.splice(this.testCase.categories.indexOf(val), 1);

    }
  }

  inCategory(data: string) {
    const check = this.testCase.categories.indexOf(data);
    if (check === -1) {
      return false;
    } else { return true; }

  }


  inPlatforms(data: string) {
    const check = this.testCase.platforms.indexOf(data);
    if (check === -1) {
      return false;
    } else { return true; }
  }


  openModal() {
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.deleteTestcase(this.testCaseId);
        this.router.navigate(['/testcases']);
      }

    });
  }


}
