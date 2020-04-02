const formatDate = require('date-fns/format')
const store = require('../utils/store')

const randomTimeA = require('../utils/randomTime')(2000, 7000, 500);
const randomTimeB = require('../utils/randomTime')(1000, 3000, 200);

module.exports = async function actionLikes(page, search) {
  await page.waitForSelector('input[placeholder="Pesquisar"]')
  await page.type('input[placeholder="Pesquisar"]', search.tag);
  await page.waitFor(2000);
  await page.waitForSelector('a[href*="/explore/tags/"]')
  await page.click('a[href*="/explore/tags/"]');
  await page.waitForSelector('a[href*="/p/"]')

  const hrefs = await page.$$('a[href*="/p/"');

  let like_count = 0;
  const liked_hashtag = store.get('hashtags', {});
  const following = store.get('following', {});

  try {
    for await (let href of hrefs) {
      if (like_count >= search.limit_like) {
        return;
      }

      if (search.follow) {
        const url = page.url();
        if (!following[url]) {
          await page.click('div[class*="f7QXd  HfISj"]>button[class*="sqdOP"]');
          following[url] = formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss');
        }
      }

      const value = await (await href.getProperty('href')).jsonValue();

      if (!liked_hashtag[value]) {
        liked_hashtag[value] = formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await href.click();
        await page.waitFor(randomTimeA());
        await page.waitForSelector('span[class*="fr66n"]>button[class*="wpO6b"]');
        await page.click('span[class*="fr66n"]>button[class*="wpO6b"]');
        await page.waitFor(randomTimeB());
        like_count++;
        await page.click('div[class*="Igw0E"]>button[class*="wpO6b "]');
      }
    }
  } catch ({ message }) {
    console.log('Erro ao curtir: ', message);
  } finally {
    store.set('hashtags', liked_hashtag);
    if (search.follow) store.set('following', following);
  }
}

