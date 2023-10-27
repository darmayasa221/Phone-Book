const getLocalStorage = (key: number) => {
  const data = localStorage.getItem(`_${key}`);
  if (data === undefined) {
    return data;
  }
  return JSON.parse(data as string);
};

const setLocalStorage = (key: number, data: any) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(`_${key}`, dataJson);
};

export { getLocalStorage, setLocalStorage };
