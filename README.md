### Installation

```bash
npm install dynamic-parsers --save
```

<br>


# Multi-Platform Strings Files Manager

### Define Translations Data Structure
```js
// Platform is an exported enum in our StringsGenerator Class:
// export enum Platform { WEB = 0, IOS = 1, ANDROID = 2, API = 3 }

const translations = [
  { key: 'HELLO', translations: { en: 'Hello English', fr: 'Hello French' }, platforms: [0, 1, 2] },
  { key: 'ERROR', translations: { en: 'Error English', fr: 'Error French' }, platforms: [0, 1, 2] },
  { key: 'EMAIL_INUSE', translations: { en: 'Email in use English', fr: 'Email in use French' }, platforms: [1, 2] },
];
```

### Setup Generator
```js
const { StringsGenerator } = require('dynamic-parsers');

const generator = new StringsGenerator(translations, ['en', 'fr']);
```

### Option 1 - Write to a Local File
```js
// async/await
(async() => {

  const platform = 1; // = Platform.IOS
  const zipFile = await generator.generateZip(platform);
  fs.writeFileSync('file.zip', zipFile);
  
})();


// Promise
generator.generateZip(platform).then(zipFile => {

  const platform = 2; // = Platform.ANDROID
  fs.writeFileSync('file.zip', zipFile);

});
```

### Option 2 - Serve in API using a Simple Express Server
```js
app.get('/generator', async (req, res) => {

  const platform = 0; // = Platform.WEB
  const zipFile = await generator.generateZip(platform);

  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-Length': zipFile.length
  });
  
  return res.end(zipFile);
});
```

### Class Parameters

``const generator = new StringsGenerator(translations, languages)``

|param|default|type
|---|---|---|
|translations|(required)|[Translations](#translations-interface)|
|languages|(required)|string[]|

### Translations Interface

```js
export enum Platform { WEB = 0, IOS = 1, ANDROID = 2, API = 3 }

export interface Transalations {
  readonly translations: { [key: string]: string }; // e.g. { en: 'Good Morning', fr: 'Bonjour' }
  readonly translatable?: boolean;
  readonly platforms: Platform[]; // e.g. [1, 2, 3]
  readonly key: string;
}
```

<br>

# Web Crawler and Scraper

### Keep in touch! Coming Soon!

<br>

#### Contact Author: [Serge Harb](mailto:me@sergeharb.com)