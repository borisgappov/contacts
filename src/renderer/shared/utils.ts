import { IContact } from 'renderer/models/contact';

export default class Utils {
  static getSampleData(): IContact[] {
    const data = window.electron.data.get('sampleData') as IContact[];
    if (data) {
      data.forEach((e, i) => {
        e.id = i + 1;
      });
      return data;
    }
    return [];
  }

  static getPasswordRequirements(): { pattern: RegExp; message: string } {
    return {
      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      message: `The minimum password length is 6 characters, the password
      must contain at least one number and one special character`,
    };
  }

  static getNextId = (items: IContact[]): number =>
    items.reduce((p: IContact, c: IContact) => (p.id > c.id ? p : c), {
      id: 0,
    } as IContact).id + 1;
}
