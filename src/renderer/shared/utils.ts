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
    const hash = CryptoJS.SHA256(password).toString();
    console.log(hash);
    const contactsJson = JSON.stringify(contacts);
    return CryptoJS.AES.encrypt(
      JSON.stringify({
        contactsJson,
        hash: CryptoJS.SHA256(contactsJson).toString(),
      } as IContactData),
      CryptoJS.SHA256(password).toString()
    ).toString();
  }

  static decrypt(encrypted: string, password: string): IContact[] | null {
    let contacts: IContact[] | null = null;
    try {
      const bytes = CryptoJS.AES.decrypt(
        encrypted,
        CryptoJS.SHA256(password).toString()
      );
      const contactData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      ) as IContactData;
      if (contactData && contactData.contactsJson) {
        if (
          contactData.hash ===
          CryptoJS.SHA256(contactData.contactsJson).toString()
        ) {
          contacts = JSON.parse(contactData.contactsJson);
        }
      }
      // eslint-disable-next-line
    } catch { 
    }
    return contacts;
  }
}
