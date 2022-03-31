import { app } from 'electron';
import { join } from 'path';
import * as fs from 'fs-extra';

export default class DataSource {
  private static dataFileName = 'rdxworks_contacts.data';

  private static fileName = () => {
    return join(app.getAppPath(), this.dataFileName);
  };

  static dataFileExist = (): boolean => fs.existsSync(this.fileName());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static save = (data: any) => fs.writeFileSync(this.fileName(), data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static load = (): any => fs.readFileSync(this.fileName()).toString();
}
