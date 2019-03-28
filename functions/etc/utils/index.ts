import { DocumentData, QuerySnapshot } from '@google-cloud/firestore';
import _ from 'lodash';

const compose = (...fns: Array<((d: any) => any)>) => (x: ((d: any) => any)) =>
  fns.reduceRight((acc, fn) => fn(acc), x);
const now = () => new Date().toISOString();
const toArray = (fireObj: DocumentData) =>
  Object.keys(fireObj).reduce(
    (acc, key) => acc.concat({ ...fireObj[key], id: key }),
    []
  );
const toObject = (id: string, fireObj: DocumentData) => ({ ...fireObj, id });
const getKey = (obj: any) => Object.keys(obj)[0];
const getValue = (obj: any) => obj[getKey(obj)];
const snapshotToArray = (snapshot: QuerySnapshot) => {
  const array: object[] = [];
  snapshot.forEach((doc: DocumentData) => {
    array.push(toObject(doc.id, doc.data()));
  });
  return array;
};

export = {
  compose,
  getKey,
  getValue,
  now,
  parseQueryForRef: require('./parseQueryForRef'),
  promisify: require('./promisify'),
  snapshotToArray,
  toArray,
  toObject,
  detectArrayChanges: require('./detectArrayChanges')
};