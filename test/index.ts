import * as fs from 'fs';
import { StringsGenerator, Translations, Platform } from '../src/strings-files';

const translations: Translations[] = [
  { platforms: [Platform.ANDROID, Platform.IOS], translations: { en: 'Hello English %d', fr: 'Hello French %d' }, translatable: true, key: 'HELLO' },
  { platforms: [Platform.ANDROID], translations: { en: 'Error in English', fr: 'Error in French' }, translatable: true, key: 'ERROR' },
  { platforms: [Platform.WEB], translations: { en: 'Email in use English', fr: 'Email in use French' }, translatable: true, key: 'INUSE' },
];

const platform = Platform.ANDROID;

(async () => {
  const generator = new StringsGenerator(translations, ['en', 'fr']);
  const zipFile = await generator.generateZip(platform);
  fs.writeFileSync('file.zip', zipFile);
})();