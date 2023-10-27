const concatWhiteSpace = (..._params: Array<string>): string | undefined => {
  const count = _params.length;
  let string: string | undefined = undefined;
  if (!Boolean(count)) {
    return string;
  }
  _params.forEach((param, index) => {
    if (index === 0) {
      string = param;
      return;
    }
    string = string?.concat(" ", param);
  });
  return string;
};
export default concatWhiteSpace;
