/**
 * It returns true if the key is in the props array
 * @param {string} key - The key of the current object being iterated over.
 * @param {string[]} props - The props that are passed to the component
 * @returns A function that takes two arguments, key and props.
 */
const inProps = (key: string, props: string[]) => {
  return props.some((omitKey) => {
    return omitKey === key;
  });
};

/**
 * Return a new object with the same keys as the original object, except for the keys in the props
 * array.
 * @param obj - { [index: string]: any }
 * @param {string[]} props - string[]
 * @returns { a: 1, b: 2, c: 3 }
 */
export const omit = (obj: { [index: string]: unknown }, props: string[]) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
