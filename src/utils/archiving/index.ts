import * as zlib from 'zlib';

export const gzip = async (data: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      zlib.gzip(data, (err, buffer) => {
        if (err) throw new Error(err.message);
        resolve(buffer);
      });
    } catch (e) {
      reject(e);
    }
  });
};
