import admin from 'firebase-admin';
import util from '../etc/util';
import serviceAccount from './secret.json';

// DO NOT WRITE ANYTHING USING THIS SCRIPT
// USE batch-write instead

const config = {
  COLLECTION_NAME: 'promises',
  MATCH_KEYWORD: 'sabah',
  CONCERNED_FIELDS: ['quote', 'title']
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

function findKeywordInField(keyword, value) {
  const present = value.toLowerCase().includes(keyword.toLowerCase());
  if (present) console.log('START\n', value, '\nEND\n');
  return present ? value : false;
}

function findKeywordInObjectFields({ object, fields, keyword }) {
  let keywordExists = false;
  fields.forEach(field => {
    const value = object[field];
    const valueWithKeyword = findKeywordInField(keyword, value);
    if (valueWithKeyword) keywordExists = true;
  });
  return keywordExists ? object : null;
}

function printLength(obj) {
  const key = Object.keys(obj)[0];
  const length = obj[key].length;
}

async function readAll() {
  const snapshot = await db.collection(config.COLLECTION_NAME).get();

  const allDocuments = util.snapshotToArray(snapshot);
  const matchedDocuments = allDocuments.filter(item =>
    findKeywordInObjectFields({
      object: item,
      fields: config.CONCERNED_FIELDS,
      keyword: config.MATCH_KEYWORD
    })
  );
  const alreadyReflecting = matchedDocuments.filter(
    document => document.state === 'Sabah'
  );
  const hasOtherValue = matchedDocuments.filter(
    document => document.state && document.state !== 'Sabah'
  );
  const result = {
    matchedDocuments,
    alreadyReflecting,
    hasOtherValue
  };
  return result;
}

export default readAll();
