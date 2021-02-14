const puppeteer = require('puppeteer');
const dotenv = require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.TWITTER_LOGIN);
    await page.type('input[name="session[username_or_email]"]', process.env.USER_NAME);
    await page.type('input[name="session[password]"]', process.env.RICKS_SECRET_PASS);
    
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('div[data-testid="LoginForm_Login_Button"]'),
    ]);
    
    await page.screenshot({ path: './screen.png' });
    await browser.close();
})();
