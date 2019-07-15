import * as JSZip from 'jszip';

export enum Platform {
  WEB = 0,
  IOS = 1,
  ANDROID = 2,
  API = 3,
}

export interface Transalations {
  readonly translations: { [key: string]: string };
  readonly translatable?: boolean;
  readonly platforms: Platform[];
  readonly key: string;
}

const NOT_SAFE_XML =
  /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;

export class StringsGenerator {

  private languages: string[];
  private transalations: Transalations[];

  constructor(transalations: Transalations[], languages: string[]) {
    if (!transalations || !languages) {
      throw new Error('Translations and Languages must be provided respectively');
    }

    this.languages = languages;
    this.transalations = transalations.map(translation => {
      const translatable = translation.translatable;
      const undefinedTranslatable = translatable === undefined;

      return {
        ...translation,
        translatable: undefinedTranslatable ? true : !!translation.translatable,
      };
    });
  }

  public generate(targetPlatform: Platform) {
    const translationsTarget = (t: Transalations) => t.platforms.includes(targetPlatform);
    const translations = this.transalations.filter(translationsTarget);

    switch (targetPlatform) {
      case Platform.IOS:
        return this.generateIosStrings(translations);

      case Platform.ANDROID:
        return this.generateXmlStrings(translations);

      case Platform.WEB:
      case Platform.API:
      default: // defaults to JSON files
        return this.generateJsonStrings(translations);
    }
  }

  public generateZip(targetPlatform: Platform) {
    const isIos = (targetPlatform === Platform.IOS);
    const files = this.generate(targetPlatform);
    const languages = [...this.languages];
    const zip = new JSZip();
    const folders = [];

    if (isIos) {
      files.unshift(files[0]);
      languages.unshift(languages[0]);
    }

    switch (targetPlatform) {
      case Platform.IOS:
      case Platform.ANDROID:
        files.forEach((data, i) => {
          folders[i] = zip.folder(this.getFolderName(targetPlatform, languages, i));
          folders[i].file(isIos ? 'Localizable.strings' : 'strings.xml', data);
        });
        break;

      case Platform.WEB:
      case Platform.API:
      default:
        files.forEach(data => zip.file('strings.json', data));
        break;
    }

    return zip.generateAsync({ type: 'nodebuffer' });
  }

  private getFolderName(targetPlatform: Platform, languages: string[], index: number) {
    const lang = languages[index];
    const isIos = (targetPlatform === Platform.IOS);

    if (index) {
      return isIos ? `${lang}.lproj` : `values-${lang}`;
    }

    // Index 0 case (default language)
    return isIos ? 'Base.lproj' : 'values';
  }

  /**
   * Escape Provided String
   *
   * @private
   * @param {string} data
   * @returns
   * @memberof StringsGenerator
   */
  private x(data: string) {
    return (`${data}`)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(NOT_SAFE_XML, '');
  }

  private generateJsonStrings(transalations: Transalations[]) {
    const STRINGS = {};

    transalations.forEach(({ key, translations }) => {
      STRINGS[key] = translations;
    });

    return [JSON.stringify(STRINGS, null, 2)];
  }

  private generateXmlStrings(transalations: Transalations[]) {
    return this.languages.map(lang => {
      const translations = transalations.map(({ key, translatable, translations }) =>
        '\n<resources>' + `\n\t<string name="${this.x(key)}" translatable="${translatable}">${this.x(translations[lang])}</string>` + '\n</resources>'
      );

      translations.unshift('<?xml version="1.0" encoding="utf-8"?>');
      return translations.join('');
    });
  }

  private generateIosStrings(transalations: Transalations[]) {
    return this.languages.map(lang =>
      transalations.map(({ key, translations }) =>
        `"${key}" = "${translations[lang]}";\n`
      ).join('').slice(0, -1)
    )
  }

}