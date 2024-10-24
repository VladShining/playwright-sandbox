import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import {
  Browser,
  BrowserType,
  chromium,
  firefox,
  Page,
  webkit,
} from "@playwright/test";
import { pageFixture } from "./browserContextFeature";

let browserInstance: Browser | null, page: Page;

import { config as ENV } from "dotenv";

const env = ENV({ path: "/.env" });
const config = {
  browser: env.parsed?.UI_AUTO_BROWSER || "chromium",
};

const browsers: { [key: string]: BrowserType } = {
  chromium: chromium,
  firefox: firefox,
  webkit: webkit,
};

const initBrowser = async (selectBrowser: string): Promise<Browser> => {
  const launchBrowser = browsers[selectBrowser];
  if (!launchBrowser) {
    throw new Error("invalid b");
  }
  return await launchBrowser.launch({ headless: true });
};

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
  pageFixture.page = await pageFixture.context.newPage();
});

After(async ({ pickle, result }) => {
  if (result?.status === Status.FAILED) {
    if (pageFixture.page) {
      const shoot = `./report/${pickle.name}.png`;
      const img = await pageFixture.page.screenshot({
        path: shoot,
        type: "png",
      });
      //@ts-ignore
      await this.attach(img, "image/png");
    } else {
      console.log("pagefix undefined");
    }
  }
  await pageFixture.page.close();
  await browser.close();
});
