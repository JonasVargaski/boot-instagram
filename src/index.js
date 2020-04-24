require("dotenv").config();
require("./utils/store").createDatabase();
const puppeteer = require("puppeteer-core");

const auth = require("./config/auth");
const { path } = require("./config/browser");
const login = require("./actions/login");
const searchAndLike = require("./actions/searchAndLike");
const follow = require("./actions/follow");

const search = {
  user: "nomePessoa",
  tag: "memesbr",
  follow: true,
  limit_like: 30,
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
  // await searchAndLike(page, search);
  //follow
  await follow(page, search)

  await browser.close();
})();
