require("dotenv").config();
require("./utils/store").createDatabase();
const puppeteer = require("puppeteer-core");

const auth = require("./config/auth");
const { path } = require("./config/browser");
const searchAndLike = require("./actions/serachAndLike");
const login = require("./actions/login");

const search = {
  tag: "memesbr",
  follow: true,
  limit_like: 10
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: path,
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage({});
  await page.goto("https://www.instagram.com/");
  await page.waitFor(1000);

  //Login
  await login(page, auth);
  //search
  await searchAndLike(page, search);

  await browser.close();
})();
