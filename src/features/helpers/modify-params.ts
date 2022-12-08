export const modifyParams = (obj: { [index: string]: string | number }) => {
  let string = '';
  for (const key in obj) {
    if (obj[key]) {
      const str = `${key}=${obj[key]}&`;
      string += str;
    }
  }
  const paramsString = string.slice(0, string.length - 1);

  return paramsString;
};
