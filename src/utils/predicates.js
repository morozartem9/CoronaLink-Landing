const isEmpty = (value) => (
  typeof value === "number"
    ? value.length
    : "size" in value
    ? value.size
    : Object.keys(value).length
) === 0;

const isNil = (value) => value == null;

const isVoid = (value) => isNil(value) || isEmpty(value);

const some = (callback, ...args) => args.some(callback);

const every = (callback, ...args) => args.every(callback);

const not = (value) => !value;

export {
  isEmpty,
  isNil,
  isVoid,
  some,
  every,
  not,
};

