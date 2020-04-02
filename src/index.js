require("dotenv").config();
const puppeteer = require("puppeteer-core");
const auth = require("./config/auth");
const store = require("./utils/store").createDatabase();
const searchAndLike = require("./actions/serachAndLike");
const login = require("./actions/login");

const search = {
  tag: "memesbr2",
  follow: true,
  limit_like: 1
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
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
