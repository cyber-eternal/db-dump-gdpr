import mysqldump from 'mysqldump';
import * as fs from 'fs';

import { IDbPrivateFields } from './interfaces/db-private-fields.interface';
import { IDbConfig } from './interfaces/mysql-db-config.interface';
import {
  getPrivateFields,
  extendPrivateFields,
} from './config/default-private-fields';
import { gzip } from '@app/utils/archiving';

const scramblingProcess = (
  tables: { data: string }[],
  fieldConfigs: IDbPrivateFields[],
): string => {
  let sqlString: string = '';

  for (const table of tables) {
    let sqlStr = table.data;

    const res = table.data
      .replace(/\r?\n|\r/g, ' ')
      .split(/(?<=\()(.*?)(?=\))/);

    for (let i: number = 1; i < res.length; i += 4) {
      const keys = res[i].split(',');
      const values = res[i + 2].split(',');

      // checking keys
      for (const j of Object.keys(keys)) {
        const key = keys[j].trim().replace(/`/g, '');
        const value = values[j] ? values[j].trim() : values[j];

        // get matched item for the key from the configs
        const matched = fieldConfigs.find((k) => k.possibleKeys.includes(key));

        if (matched) {
          const valueToReplace = matched.valuesToReplace[
            // random number form 0 to matched.valuesToReplace.length to getting random value
            Math.floor(Math.random() * matched.valuesToReplace.length)
          ] as string;

          sqlStr = sqlStr.replace(
            new RegExp(value, 'g'), // find and replace all values which equals to value
            matched.type === 'string' ? `'${valueToReplace}'` : valueToReplace,
          );
        }
      }
    }

    // concatenate insert query for each table
    sqlString += `
${sqlStr}
`;
  }

  return sqlString;
};

export const getDump = async (
  dbConfigs: IDbConfig,
  customFields?: IDbPrivateFields[],
  // options?: any,
): Promise<Buffer> => {
  // get private fields configuration
  const fieldConfigs: IDbPrivateFields[] =
    customFields && customFields.length
      ? extendPrivateFields(customFields)
      : getPrivateFields();

  const { host, username: user, password, db, port } = dbConfigs;

  // get dumb of MySQL database
  const result = await mysqldump({
    connection: {
      host,
      user,
      password,
      database: db,
      port,
    },
  });

  // generating sql string
  const sqlString = `
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

${result.dump.schema}

${scramblingProcess(result.tables, fieldConfigs)}

${result.dump.trigger}

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */`;

  // Calling gzip method
  const gzipBuffer = await gzip(sqlString);

  return gzipBuffer;
};
