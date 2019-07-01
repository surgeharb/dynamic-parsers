import { StringsGenerator, Transalations } from '../src/strings-files';

const translations: Transalations[] = [
  { target: StringsGenerator.PLATFORM.WEB, translations: { en: 'Hello English', fr: 'Hello French' }, translatable: true, key: 'HELLO' },
  { target: StringsGenerator.PLATFORM.ANDROID, translations: { en: 'Error in English', fr: 'Error in French' }, translatable: true, key: 'ERROR' },
  { target: StringsGenerator.PLATFORM.IOS, translations: { en: 'Email in use English', fr: 'Email in use French' }, translatable: true, key: 'INUSE' },
];

const generator = new StringsGenerator(translations, ['en', 'fr']);
const files = generator.generateXmlStrings();
console.log(files[1]);