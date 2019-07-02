import * as fs from 'fs';
import { StringsGenerator, Transalations, Platform } from '../src/strings-files';

const translations: Transalations[] = [
  { targets: ['ANDROID', 'IOS'], translations: { en: 'Hello English', fr: 'Hello French' }, translatable: true, key: 'HELLO' },
  { targets: ['IOS'], translations: { en: 'Error in English', fr: 'Error in French' }, translatable: true, key: 'ERROR' },
  { targets: ['WEB'], translations: { en: 'Email in use English', fr: 'Email in use French' }, translatable: true, key: 'INUSE' },
];

const platform: Platform = 'IOS';

(async () => {
  const generator = new StringsGenerator(translations, ['en', 'fr']);
  const zipFile = await generator.generateZip(platform);
  fs.writeFileSync('file.zip', zipFile);
})();