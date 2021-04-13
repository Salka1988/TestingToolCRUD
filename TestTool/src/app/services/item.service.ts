import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExecutionTestCase, Testcase} from '../model/testcase';
import {map} from 'rxjs/operators';
import {Categories} from '../model/categories';
import {Platforms} from '../model/platforms';
import {Executions} from '../model/executions';
import * as firebase from 'firebase';
import {User} from '../model/user';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
//
// @Injectable({
//   providedIn: 'root'
// })
export class ItemService {

  // projectId = environment.testToolProjectId;
  // appUsers: Observable<User[]>;

  constructor(public afs: AngularFirestore) {
  }

  getTestcases(): Observable<Testcase[]> {
    return this.afs.collection('projects').doc(this.projectId).collection('testCases', ref =>
      ref.where('active', '==', true)
    ).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Testcase;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  addTestcase(testcase: Testcase) {
    this.afs.collection('projects').doc(this.projectId).collection('testCases').add(testcase);
  }

  getPlatforms(): Observable<Platforms[]> {
    return this.afs.collection('projects').doc(this.projectId).collection('platforms').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Platforms;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getCategories(): Observable<Categories[]> {
    return this.afs.collection('projects').doc(this.projectId).collection('categories').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Categories;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getExecutions(): Observable<Executions[]> {
    return this.afs.collection('projects').doc(this.projectId).collection('executions',
      ref => ref.orderBy('dateofexecution', 'desc')).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Executions;
        data.id = a.payload.doc.id;
        return data;
      });

    }));
  }

  addExecution(execution: Executions) {
    return this.afs.collection('projects').doc(this.projectId).collection('executions').add(execution);
  }

  getSpecificExecutionList(executionID: string) {
    return this.afs.collection('projects').doc(this.projectId).collection('executions').doc(executionID).collection('testCases').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ExecutionTestCase;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  /**
   * Get a single Execution.
   * The execution will have its id already set.
   * @param {string} executionId id of the execution
   */
  getExecution(executionId: string) {
    return this.afs.collection('projects').doc(this.projectId).collection('executions').doc(executionId).snapshotChanges().pipe(map(changes => {
      const result = changes.payload.data() as Executions;
      result.id = changes.payload.id;
      return result;
    }));
  }

  updateExecutionTestcase(executionID: string, testcaseID: string, comment: string, state: string) {
    this.afs.collection('projects').doc(this.projectId).collection('executions').doc(executionID).collection('testCases').doc(testcaseID).update({
      lastModifiedOn: firebase.firestore.Timestamp.fromDate(new Date()),
      comment: comment ? comment : '',
      state: state
    });
  }

  getExecutionTestcase(executionID: string) {
    return this.afs.collection('projects').doc(this.projectId).collection('executions').doc(executionID).collection('testCases', ref =>
      ref.where('state', '==', 'WAITING').limit(1)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ExecutionTestCase;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getSkippedExecutionTestcase(executionID: string) {
    return this.afs.collection('projects').doc(this.projectId).collection('executions').doc(executionID).collection('testCases', ref => ref.where('state', '==', 'SKIPPED').orderBy('lastModifiedOn', 'asc').limit(1)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ExecutionTestCase;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getOneTestcase(testcaseID: string) {
    return this.afs.collection('projects').doc(this.projectId).collection('testCases').doc(testcaseID).get();
  }

  getOneExecutionTestcase(executionID: string, testcaseID: string) {
    return this.afs.collection('projects').doc(this.projectId).collection('executions').doc(executionID).collection('testCases').doc(testcaseID).get();
  }

  updateTestcase(testcaseID: string, updateTestcase: Testcase) {
    this.afs.collection('projects').doc(this.projectId).collection('testCases').doc(testcaseID).update(updateTestcase);
  }

  deleteTestcase(testcaseID: string) {
    this.afs.collection('projects').doc(this.projectId).collection('testCases').doc(testcaseID).update({
      active: false
    });
  }

  setUser(userID: string, userData: User) {
    this.afs.collection('Users').doc(userID).set(userData);
  }

  getUsers(): Observable<User[]> {
    // this.UsersCollection = this.afs.collection('Users');
    return this.appUsers = this.afs.collection('Users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }


  addNewCategory(category: Categories) {
    this.afs.collection('projects').doc(this.projectId).
    collection('categories').add(category);
  }


}
