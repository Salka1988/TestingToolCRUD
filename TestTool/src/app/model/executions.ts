import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Executions {
  id?: string;
  userid?: string;
  dateofexecution?: Timestamp;
  platform?: string;
  version?: string;
  device?: string;
  categories?: string[];


  numberOfSuccesses?: number;
  numberOfFailures?: number;
  totalTestCases?: number;

}
