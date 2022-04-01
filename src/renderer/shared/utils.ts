import { IContact } from 'renderer/models/contact';
import { custom } from 'devextreme/ui/dialog';

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

  // static confirm = (title: string, message: string, ) => custom({
  //   title: "Confirm?",
  //   messageHtml: "Save",
  //   buttons: [{
  //     text: "Yes",
  //     onClick: () => true,
  //     onContentReady: function(e: any) {
  //       e.element[0].onkeydown = function(e) {
  //         if(e.keyCode == 39) //right arrow
  //           $(".dx-dialog-button")[1].focus(); //set focus to "No" button
  //         else if(e.keyCode == 13)
  //           return "Confirmed"
  //       }
  //     }
  //   }, {
  //     text: "No",
  //     onClick: function(e) {
  //       return "Cancelled"
  //     },
  //     onContentReady: function(e) {
  //       e.element[0].onkeydown = function(e) {
  //         if(e.keyCode == 37) //left arrow
  //           $(".dx-dialog-button")[0].focus(); //set focus to "Yes" button
  //         else if(e.keyCode == 13)
  //           return "Cancelled"
  //       }
  //     }
  //   }],

  // });
}
