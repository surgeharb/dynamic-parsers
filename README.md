### Installation

```bash
npm install dynamic-parsers --save
```

<br>


# Multi-Platform Strings Files Manager

### Define Translations Data Structure
```ts
// Platform is an exported enum in our StringsGenerator Class:
// export enum Platform { WEB = 0, IOS = 1, ANDROID = 2, API = 3 }

const translations = [
  { key: 'HELLO', translations: { en: 'Hello English', fr: 'Hello French' }, platforms: [0, 1, 2] },
  { key: 'ERROR', translations: { en: 'Error English', fr: 'Error French' }, platforms: [0, 1, 2] },
  { key: 'EMAIL_INUSE', translations: { en: 'Email in use English', fr: 'Email in use French' }, platforms: [1, 2] },
];
```

### Setup Generator
```ts
const { StringsGenerator } = require('dynamic-parsers');

const generator = new StringsGenerator(translations, ['en', 'fr']);
```

### Option 1 - Write to a Local File
```ts
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
```ts
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

```ts
export enum Platform { WEB = 0, IOS = 1, ANDROID = 2, API = 3 }

export interface Translations {
  readonly translations: { [key: string]: string }; // e.g. { en: 'Good Morning', fr: 'Bonjour' }
  readonly translatable?: boolean;
  readonly platforms: Platform[]; // e.g. [1, 2, 3]
  readonly key: string;
}
```

<br>

# Web Crawler and Scraper

```ts
const crawlerConfig = {
  url: 'https://www.example.com/search/result?q=macbook',
  itemSelector: 'ul.products-grid .item',
  itemDetails: [
    { key: 'name', selector: '.product-name' },
    { key: 'sale', selector: '.product-sale .price' },
    { key: 'price', selector: '.product-details .price' },
    { key: 'image', selector: '.product-image img', attribute: 'data-src' },
  ]
};

(async () => {
  const data = await WebCrawl(crawlerConfig);
  console.log("LOG: data", data);
})();
```

### Crawler Config Structure

```ts
// either "html" or "url" is required

export interface ItemDetailsConfig {
  key: string;
  selector: string;
  attribute?: string;
}

export interface CrawlerConfig {
  url?: string;
  html?: string;
  itemSelector: string;
  itemDetails: ItemDetailsConfig[];
}
```

<br>

#### Contact Author: [Serge Harb](mailto:me@sergeharb.com)