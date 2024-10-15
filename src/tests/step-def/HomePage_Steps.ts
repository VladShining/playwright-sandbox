import { Given, Then, When } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

let browser: Browser;
let context: any;
let page: Page;
const url = "https://www.webdriveruniversity.com";

Given(
  "I navigate to webdriveruniversity homepage",
  { timeout: 60000 },
  async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    page = await context.newPage();
    await page.goto(url);
    // return;
    // return "pending";
  }
);

When("I click on the contact us button", async () => {
  // await page.pause();
});
When("I type a first name", async () => {
  await page.getByPlaceholder("First Name").fill("Joe");
  await page.bringToFront();
});
When("I type a last name", async () => {
  await page.getByPlaceholder("Last Name").fill("donh");
});
When("I type a email address", function () {});
When("I type a comment", function () {
  return;
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
When("I click on the submit button", function () {
  return;
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
Then(
  "I should be presented with a successful contact us submission message",
  function () {
    browser.close();
    return;
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);
