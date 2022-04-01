import { app } from 'electron';
import { join } from 'path';
import * as fs from 'fs-extra';
import { IPreferences } from 'common/preferences';

export default class PreferencesManager {
  static fileName = join(app.getPath('userData'), 'contacts_preferences.json');

  static save = async (json: string) => fs.writeFile(this.fileName, json);

  static load = (): IPreferences =>
    fs.existsSync(this.fileName)
      ? JSON.parse(fs.readFileSync(this.fileName).toString())
      : null;
}
