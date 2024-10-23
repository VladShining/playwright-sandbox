import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";
import { pageFixture } from "./browserContextFeature";

let browser: Browser, page: Page;

BeforeAll(async () => {
  console.log("\n execute test");
});

AfterAll(async () => {
  console.log("\n end execution");
});

//before each
Before(async () => {
  console.log("\n iteration");
  browser = await chromium.launch({ headless: false });
  pageFixture.context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  //   pageFixture.page = await pageFixture.context.newPage();
});

After(async () => {
  await pageFixture.page.close();
  await browser.close();
});
