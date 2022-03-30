import { IContact } from 'renderer/models/contact';

export default function getSampleData(): IContact[] {
  const data = window.electron.store.get('sampleData') as IContact[];
  if (data) {
    data.forEach((e, i) => {
      e.id = i + 1;
    });
    return data;
  }
  return [];
}
