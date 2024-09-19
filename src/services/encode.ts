export function encode2queryData(data: any) {
  const stringData = JSON.stringify(data);
  const encodedData = btoa(stringData);
  return encodedData;
}
