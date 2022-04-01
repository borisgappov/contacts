import { app } from 'electron';
import { join } from 'path';
import * as fs from 'fs-extra';

export default class DataSource {
  static fileName = join(app.getPath('userData'), 'contacts.data');

  static dataFileExist = (): boolean => fs.existsSync(this.fileName);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static save = async (data: any) => fs.writeFile(this.fileName, data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static load = (): any => fs.readFileSync(this.fileName).toString();

  static removeDataFile = () => fs.removeSync(this.fileName);
}
