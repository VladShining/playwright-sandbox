import { Given, Then, When } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";
import { pageFixture } from "./hooks/browserContextFeature";

let browser: Browser;
let context: any;
let page: Page;
const url = "https://www.webdriveruniversity.com/Contact-Us/contactus.html";

Given(
  "I navigate to webdriveruniversity homepage",
  { timeout: 6000 },
  async () => {
    await pageFixture.page.goto(url);
  }
);

When("I click on the contact us button", async () => {
  // await page.pause();
  return "passed";
});
When(
  "I type a first name {string}",
  { timeout: 6000 },
  async (firstName: string) => {
    await pageFixture.page.pause();
    await pageFixture.page.getByPlaceholder("First Name").fill(firstName);
    // await pageFixture.page.bringToFront();
  }
);
When("I type a last name", async () => {
  await pageFixture.page.getByPlaceholder("Last Name").fill("donh");
});
When("I type a email address", { timeout: 6000 }, async () => {
  await pageFixture.context.newPage();
  // await pageFixture.context.waitForEvent("page"); //inutile
  const allPage = await pageFixture.context.pages();
  //assing the first  page
  pageFixture.page = allPage[0];

  await pageFixture.page.bringToFront();
  await pageFixture.page.setViewportSize({ width: 1920, height: 1080 });
  await pageFixture.page.getByPlaceholder("First Name").fill("edit");
});
When("I type a comment", { timeout: 6000 }, async () => {
  await pageFixture.page.pause();
  return;
});
When("I click on the submit button", async () => {
  return;
});
Then(
  "I should be presented with a successful contact us submission message",
  async () => {
    return pageFixture.context.close();
  }
);
