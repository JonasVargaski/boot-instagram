const formatDate = require("date-fns/format");
const store = require("../utils/store");

const randomTimeA = require("../utils/randomTime")(4000, 10000, 500);

async function paginate(page) {
  await page.waitForSelector('div[class*="isgrP"]');
  await page.evaluate(() => {

    let counter = 0;

    const timer = setInterval(() => {
      counter++;
      document.querySelector('div[class*="isgrP"]').scroll(0, 5555555)
      if (counter >= 6) {
        clearInterval(timer);
      }
    }, 1000)
  });

  await page.waitFor(7000);
}

module.exports = async function follow(page, search) {
  await page.waitForSelector('input[placeholder="Pesquisar"]');
  await page.type('input[placeholder="Pesquisar"]', search.user);
  await page.waitFor(2000);
  await page.waitForSelector('div[class*="fuqBx"]>a');
  await page.click('div[class*="fuqBx"]>a');

  await page.waitForSelector('a[class*="-nal3"]');
  await page.click('a[class*="-nal3"]');

  await page.waitFor(1000);

  await paginate(page);

  await page.waitForSelector('a[class*="FPmhX"]');
  const users = await page.$$('a[class*="FPmhX"');
  await page.waitForSelector('li button[class*="sqdOP"');
  const buttons = await page.$$('li button[class*="sqdOP"');

  let follow_count = 0;
  const following = store.get("following", {});

  try {
    for await (let user of users) {
      if (follow_count >= search.limit_like) {
        return
      }

      const user_name = await (await user.getProperty("title")).jsonValue();

      if (!following[user_name]) {
        await buttons[follow_count].click();
        await page.waitFor(randomTimeA());
        following[user_name] = formatDate(new Date(), "dd/MM/yyyy HH:mm:ss");
      }
      follow_count++
    }
  } catch ({ message }) {
    console.log("Erro ao curtir: ", message);
  } finally {
    store.set("following", following);
  }
};
