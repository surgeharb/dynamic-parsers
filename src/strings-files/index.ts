export interface Transalations {
  readonly translations: { [key: string]: string };
  readonly translatable: boolean;
  readonly target: number;
  readonly key: string;
}

const NOT_SAFE_XML =
  /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;

export class StringsGenerator {

  public static readonly PLATFORM = {
    WEB: 0, IOS: 1, ANDROID: 2,
  };

  private languages: string[];
  private transalations: Transalations[];

  constructor(transalations: Transalations[], languages: string[]) {
    if (!transalations || !languages) {
      throw new Error('Translations and Languages must be provided respectively');
    }

    this.transalations = transalations;
    this.languages = languages;
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

  public generateXmlStrings() {
    return this.languages.map(lang => {
      const translations = this.transalations.map(({ key, translatable, translations }) =>
        '\n<resources>' + `\n\t<string name="${this.x(key)}" translatable="${!!translatable}">${this.x(translations[lang])}</string>` + '\n</resources>'
      );

      translations.unshift('<?xml version="1.0" encoding="utf-8"?>');
      return translations.join('');
    });
  }

  public generateIosFiles() {
    return this.languages.map(lang =>
      this.transalations.map(({ key, translations }) =>
        `"${key}": "${translations[lang]}"\n`
      ).join('').slice(0, -1)
    )
  }

}