module.exports = async function login(page, auth) {
  console.log(auth);
  if (auth.useFacebook) {
    await page.click('span[class*="KPnG0"]');
    await page.type('input[id="email"]', auth.login);
    await page.type('input[id="pass"]', auth.password);
    await page.waitFor(300);
    await page.click('button[id="loginbutton"]');
  } else {
    await page.waitFor(300);
    await page.type('input[aria-label="Telefone, nome de usuário ou email"]', auth.login);
    await page.type('input[aria-label="Senha"]', auth.password);
    await page.waitFor(300);
    await page.click('button[class*="sqdOP  L3NKy   y3zKF     "]');
  }

  //close request notification
  await page.waitForSelector('button[class*="aOOlW   HoLwm"]')
  await page.click('button[class*="aOOlW   HoLwm"]')
}