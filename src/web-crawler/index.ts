import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

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

export const WebCrawl = async (config: CrawlerConfig) => {
  const { url, itemSelector, itemDetails } = config;
  let { html } = config;

  if (url) {
    const data = await fetch(url);
    html = await data.text();
  } else if (!html) {
    console.error('Please specify either "html" or "url" in config');
    return [];
  }

  const $ = cheerio.load(html);
  const formattedData = [];

  $(itemSelector).each((i: number, item: any) => {
    const itemData = {};

    itemDetails.forEach(option => {
      let detailsElement = $(item).find(option.selector);

      if (option.attribute) {
        detailsElement = detailsElement?.attr(option.attribute) ?? '';
      } else {
        detailsElement = detailsElement?.text() ?? '';
      }

      itemData[option.key] = detailsElement.trim();
    });

    formattedData.push(itemData);
  });

  return formattedData;
}
