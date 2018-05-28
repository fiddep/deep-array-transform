const defaultOptions = {
  defaultKey: "index",
  recursively: true
};

export default (value, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  return transform(value, mergedOptions);
};

const transform = (array, options = {}, key = "") => {
  const { defaultKey, recursively } = options;
  if (typeof array !== "object" || array === null) {
    return array;
  } else if (Array.isArray(array)) {
    return convertArrayToMap(array, options, key);
  } else if (recursively) {
    return recursivelyTransformObject(array, options);
  } else {
    return array;
  }
};

const recursivelyTransformObject = (obj, options) =>
  Object.keys(obj).reduce(
    (map, key) => ({
      ...map,
      [key]: !checkIgnoredPatterns(key, options.ignorePattern)
        ? transform(obj[key], options, key)
        : obj[key]
    }),
    {}
  );

const convertArrayToMap = (array, options, key) => {
  const { defaultKey } = options;
  return array.reduce((map, value, index, array) => {
    const i = value[determineId(defaultKey, key)];
    const prioId = defaultKey === "index" ? index : i;
    return {
      ...map,
      [prioId]: transform(value, options)
    };
  }, {});
};

const determineId = (defaultKey, key = "default") => {
  if (typeof defaultKey !== "object") {
    return defaultKey;
  } else {
    return defaultKey.hasOwnProperty(key)
      ? defaultKey[key]
      : defaultKey.default;
  }
};

const checkIgnoredPatterns = (key, pattern = "") => {
  if (pattern === "") {
    return false;
  }
  const regEx = new RegExp(pattern);
  return regEx.test(key);
};
