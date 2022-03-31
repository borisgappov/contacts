import CryptoJS from 'crypto-js';
import { IContact } from 'renderer/models/contact';
import { IContactData } from 'renderer/models/contact-data';

export default class Utils {
  static getSampleData(): IContact[] {
    const data = window.electron.store.get('sampleData') as IContact[];
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

  static encrypt(contacts: IContact[], password: string): string {
    const contactsJson = JSON.stringify(contacts);
    return CryptoJS.AES.encrypt(
      JSON.stringify({
        contactsJson,
        hash: this.getHash(contactsJson),
      } as IContactData),
      password
    ).toString();
  }

  static decrypt(encrypted: string, password: string): IContact[] | null {
    let contacts: IContact[] | null = null;
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, password);
      const json = bytes.toString(CryptoJS.enc.Utf8);
      const contactData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      ) as IContactData;
      if (contactData && contactData.contactsJson) {
        if (contactData.hash === this.getHash(contactData.contactsJson)) {
          contacts = JSON.parse(contactData.contactsJson);
        }
      }
      // eslint-disable-next-line
    } catch (ex) {
      console.log(ex);
    }
    return contacts;
  }

  static getHash = (str: string): string => CryptoJS.SHA256(str).toString();

  static getNextId = (items: IContact[]): number =>
    items.reduce((p: IContact, c: IContact) => (p.id > c.id ? p : c), {
      id: 0,
    } as IContact).id + 1;
}
