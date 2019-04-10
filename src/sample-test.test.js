const puppeteer = require('puppeteer');
const getSiteDomainFromEnv = require('./utils/getSiteDomainFromEnv');

siteDomain = getSiteDomainFromEnv(process.env);

console.log('Site Domain: ', siteDomain);

describe('create account page test', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
  });

  // it('show correct page: variant', async () => {
  //   const page = await browser.newPage();
  //   await page.goto(
  //     'http://localhost:8080/app/register?experimentName=2018_12_STREAMLINED_ACCOUNT&experimentVariation=STREAMLINED#/'
  //   );
  //   const image = await page.screenshot();

  //   expect(image).toMatchImageSnapshot();
  // });

  it('show correct page: variant and filled with name', async () => {
    const page = await browser.newPage();
    await page.goto(
      'http://localhost:8080/app/register?experimentName=2018_12_STREAMLINED_ACCOUNT&experimentVariation=STREAMLINED#/'
    );
    await page.waitForSelector('input[name=name]');
    await page.click('input[automation=name]');
    await page.type('input[automation=name]', 'Adam Chen Wei');

    await page.click('input[automation=username]');
    await page.type('input[automation=username]', 'adamchenwei.tester@gmail.com');

    await page.click('input[automation=password]');
    await page.type('input[automation=password]', 'adamchenwei.tester@gmail.com');
    // await page
    //   .waitForXPath("//input[@id='name']")
    //   .then(dom => {
    //     console.log('--------------vvv?????---------')
    //     console.log(dom)
    //     // console.log(dom.value)
    //     console.log('--------------^^^?????---------')

    //     dom.value='something is here'
    //   })
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  // it('show correct page: default', async () => {
  //   const page = await browser.newPage();
  //   await page.goto(
  //     'http://localhost:8080/app/register?experimentName=2018_12_STREAMLINED_ACCOUNT&experimentVariation=CONTROL#/'
  //   );
  //   const image = await page.screenshot();

  //   expect(image).toMatchImageSnapshot();
  // });

  afterAll(async () => {
    await browser.close();
  });
});
