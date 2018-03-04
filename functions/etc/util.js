const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const now = () => new Date().toISOString();
const toArray = fireObj =>
  Object.keys(fireObj).reduce(
    (acc, key) => acc.concat(Object.assign({ id: key }, fireObj[key])),
    []
  );
const toObject = (id, fireObj) => Object.assign({ id }, fireObj);

module.exports = {
  compose,
  now,
  toArray,
  toObject
};