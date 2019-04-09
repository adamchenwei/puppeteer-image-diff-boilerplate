const puppeteer = require('puppeteer');

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
    await page.click('input[name=name]');
    await page.type('input[name=name]', 'adamchenwei@gmail.com');
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
