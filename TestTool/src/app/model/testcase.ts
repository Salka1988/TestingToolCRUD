import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';


export interface Testcase {
  id?: string;
  title?: string;
  precondition?: string;
  teststeps?: string;
  expected_results?: string;
  platforms?: string[];
  categories?: string[];
  description?: string;
  active?: boolean;
}

export interface ExecutionTestCase extends Testcase {
  comment?: string;
  state?: string;
  lastModifiedOn?: Timestamp;
}
