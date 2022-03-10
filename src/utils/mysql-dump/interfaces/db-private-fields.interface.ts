export interface IDbPrivateFields {
  keyName: string;
  possibleKeys: string[];
  type: string,
  valuesToReplace: (string | number | boolean | Date)[];
}
