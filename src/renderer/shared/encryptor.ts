import CryptoJS from 'crypto-js';
import { IContact } from 'renderer/models/contact';
import { IContactData } from 'renderer/models/contact-data';

export default class Encryptor {
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
      const contactData = JSON.parse(
        CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8)
      ) as IContactData;
      if (contactData && contactData.contactsJson) {
        if (contactData.hash === this.getHash(contactData.contactsJson)) {
          contacts = JSON.parse(contactData.contactsJson);
        }
      }
      // eslint-disable-next-line
    } catch (ex) {}
    return contacts;
  }

  static getHash = (str: string): string => CryptoJS.SHA256(str).toString();
}
