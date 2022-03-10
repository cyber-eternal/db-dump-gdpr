import { IDbPrivateFields } from '../interfaces/db-private-fields.interface';

export default [
  {
    keyName: 'first name',
    possibleKeys: [
      'firstName',
      'fname',
      'first_name',
      'firstName',
      'FirstName',
    ],
    type: 'string',
    valuesToReplace: ['fname example1', 'fname example2', 'fname example3'],
  },
  {
    keyName: 'last name',
    possibleKeys: ['lastName', 'lname', 'last_name', 'lastName', 'LastName'],
    type: 'string',
    valuesToReplace: ['lname example1', 'lname example2', 'lname example3'],
  },
  {
    keyName: 'zip code',
    possibleKeys: ['zip', 'zip_code', 'zipCode', 'zipcode'],
    type: 'string',
    valuesToReplace: ['EX111', 'EX112', 'EX113'],
  },
  {
    keyName: 'street name',
    possibleKeys: [
      'sname',
      'street_name',
      'streetName',
      'StreetName',
      'street',
      'address',
    ],
    type: 'string',
    valuesToReplace: [
      'example address1',
      'example address2',
      'example address3',
    ],
  },
  {
    keyName: 'birth date',
    possibleKeys: [
      'birthdate',
      'birth_date',
      'birthDate',
      'bdate',
      'bDate',
      'BirthDate',
    ],
    type: 'string',
    valuesToReplace: ['1975-10-22', '1975-11-22', '1975-12-22'],
  },
  {
    keyName: 'email address',
    possibleKeys: [
      'email',
      'email_address',
      'emailAddress',
      'EmailAddress',
      'userEmail',
      'UserEmail',
      'user_email',
    ],
    type: 'string',
    valuesToReplace: [
      'example1@example.com',
      'example2@example.com',
      'example3@example.com',
    ],
  },
  {
    keyName: 'phone number',
    possibleKeys: [
      'pnumber',
      'phone',
      'phoneNumber',
      'PhoneNumer',
      'phone_number',
    ],
    type: 'string',
    valuesToReplace: ['+12345678', '+22345678', '+32345678'],
  },
  {
    keyName: 'bank account',
    possibleKeys: [
      'baccount',
      'bank',
      'bank_account',
      'bankAccount',
      'BankAccount',
    ],
    type: 'string',
    valuesToReplace: ['123456789', '223456789', '323456789'],
  },
] as IDbPrivateFields[];
