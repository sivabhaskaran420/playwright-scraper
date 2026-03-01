const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=89',
  'https://sanand0.github.io/tdsdata/js_table/?seed=90',
  'https://sanand0.github.io/tdsdata/js_table/?seed=91',
  'https://sanand0.github.io/tdsdata/js_table/?seed=92',
  'https://sanand0.github.io/tdsdata/js_table/?seed=93',
  'https://sanand0.github.io/tdsdata/js_table/?seed=94',
  'https://sanand0.github.io/tdsdata/js_table/?seed=95',
  'https://sanand0.github.io/tdsdata/js_table/?seed=96',
  'https://sanand0.github.io/tdsdata/js_table/?seed=97',
  'https://sanand0.github.io/tdsdata/js_table/?seed=98',
];

(async () => {
  const browser = await chromium.launch();
  let grandTotal = 0;

  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for the table to load (it's dynamically generated)
    await page.waitForSelector('table');

    // Grab all text inside table cells
    const numbers = await page.$$eval('td', cells =>
      cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed URL: ${url} → Sum: ${pageSum}`);
    grandTotal += pageSum;

    await page.close();
  }

  await browser.close();
  console.log(`TOTAL SUM ACROSS ALL PAGES: ${grandTotal}`);
})();
