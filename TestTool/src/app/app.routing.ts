import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import {AddTestcaseComponent} from './component/add-testcase/add-testcase.component';
import {AddexecutionComponent} from './component/addexecution/addexecution.component';
import {StartexecutionComponent} from './component/startexecution/startexecution.component';
import {AuthGuard} from './core/auth.guard';
import {ExecutionsComponent} from './executions/executions.component';
import {TestcasesComponent} from './component/testcases/testcases.component';
import {RunExecutionComponent} from './component/execution/run/run.component';
import {ViewTestCaseComponent} from './component/testcase/view/view.component';
import {EditTestCaseComponent} from './component/testcase/edit/edit.component';
import {CategoryListComponent} from './component/add-category/category-list.component';

const routes: Routes = [
  { path: 'testcases', component: TestcasesComponent, canActivate: [AuthGuard]},
  { path: 'testcase/new', component: AddTestcaseComponent, canActivate: [AuthGuard]},
  { path: 'testcase/:testCaseId/edit', component: EditTestCaseComponent, canActivate: [AuthGuard]},
  { path: 'testcase/:testCaseId', component: ViewTestCaseComponent, canActivate: [AuthGuard]},
  { path: 'executions', component: ExecutionsComponent, canActivate: [AuthGuard]},
  { path: 'execution/new', component: AddexecutionComponent, canActivate: [AuthGuard]},
  { path: 'execution/:executionId/run/:testCaseId', component: RunExecutionComponent, canActivate: [AuthGuard]},
  { path: 'execution/:executionId/run', component: RunExecutionComponent, canActivate: [AuthGuard]},
  { path: 'execution/:executionId', component: StartexecutionComponent, canActivate: [AuthGuard]},
  { path: 'categories', component:     CategoryListComponent, canActivate: [AuthGuard]},
  { path: 'testcases/category/:categoryId', component:     TestcasesComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/executions', canActivate: [AuthGuard]}
  ];
// create the routing module
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

