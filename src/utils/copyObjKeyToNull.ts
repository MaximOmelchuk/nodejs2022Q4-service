const copyObjKeyToNull = (obj: any, key: string) => {
  const copy = { ...obj };
  copy[key] = null;
  return copy;
};

export default copyObjKeyToNull;
