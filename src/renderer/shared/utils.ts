/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint promise/catch-or-return: off, promise/always-return: off, no-return-assign: off */
import dxButton from 'devextreme/ui/button';
import { custom, CustomDialogOptions } from 'devextreme/ui/dialog';
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

  static confirm = (
    messageHtml: string,
    title = 'Please confirm'
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      let leftButton: dxButton | undefined;
      let rightButton: dxButton | undefined;
      custom({
        title,
        messageHtml,
        showTitle: true,
        dragEnabled: false,
        buttons: [
          {
            text: 'Yes',
            onClick: () => resolve(true),
            onInitialized: (e: any) => (leftButton = e.component?.instance()),
            onKeyDown: (e: any) => e.keyCode === 39 && rightButton?.focus(),
          },
          {
            text: 'No',
            onClick: () => resolve(false),
            onInitialized: (e: any) => (rightButton = e.component?.instance()),
            onKeyDown: (e: any) => e.keyCode === 37 && leftButton?.focus(),
          },
        ],
      } as unknown as CustomDialogOptions).show();
    });
  };
}
