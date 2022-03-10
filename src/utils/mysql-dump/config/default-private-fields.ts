import { IDbPrivateFields } from '../interfaces/db-private-fields.interface';
import defaultPrivateFields from './default-private-fields-config';

const customFieldsValidation = (customFields: IDbPrivateFields[]): void => {
  for (const i of customFields) {
    if (
      !i.possibleKeys ||
      !i.possibleKeys.length ||
      !i.valuesToReplace ||
      !i.valuesToReplace.length
    )
      throw new Error('Invalid custom fields configuration');
  }
  return;
};

export const getPrivateFields = (): IDbPrivateFields[] => {
  return defaultPrivateFields;
};

export const extendPrivateFields = (
  customFields: IDbPrivateFields[],
): IDbPrivateFields[] => {
  customFieldsValidation(customFields);
  return [...customFields, ...defaultPrivateFields];
};
