import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './services/auth.service';
import { routingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ItemService } from './services/item.service';
import { AddTestcaseComponent } from './component/add-testcase/add-testcase.component';
import { AddexecutionComponent } from './component/addexecution/addexecution.component';
import { AuthGuard} from './core/auth.guard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainnavComponent } from './mainnav/mainnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipList,
  MatChip,
  MatChipsModule,
  MatTooltipModule,
  MatTabsModule,
  MatDialog,
  MatDialogModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule
} from '@angular/material';
import { ExecutionsComponent } from './executions/executions.component';
import {TestcasesComponent} from './component/testcases/testcases.component';
import { PlatformChipComponent } from './platform-chip/platform-chip.component';
import {RunExecutionComponent} from './component/execution/run/run.component';
import {ViewTestCaseComponent} from './component/testcase/view/view.component';
import {EditTestCaseComponent} from './component/testcase/edit/edit.component';
import {ConfirmDeleteDialogComponent} from './component/testcase/edit/delete-box/confirm-delete-dialog.component';
import {ProgressBarComponent} from './component/progress-bar/progress-bar';
import {CategoryListComponent} from './component/add-category/category-list.component';

import {StartexecutionComponent} from './component/startexecution/startexecution.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTestcaseComponent,
    AddexecutionComponent,
    StartexecutionComponent,
    MainnavComponent,
    ExecutionsComponent,
    TestcasesComponent,
    PlatformChipComponent,
    RunExecutionComponent,
    ViewTestCaseComponent,
    EditTestCaseComponent,
    ConfirmDeleteDialogComponent,
    CategoryListComponent,
    ConfirmDeleteDialogComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    routingModule,
    AngularFontAwesomeModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [AuthService, ItemService, AuthGuard,{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteDialogComponent
  ]
})

export class AppModule { }
