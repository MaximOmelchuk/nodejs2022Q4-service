const omitKeyFromObj = (obj: any, key: string) => {
  const copy = { ...obj };
  delete copy[key];
  return copy;
};

export default omitKeyFromObj;
