// In cleanObjects.js
async function cleanObject(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      // This checks for non-empty strings; adjust as needed for other types
      acc[key] = value;
    }
    return acc;
  }, {});
}
export { cleanObject };
