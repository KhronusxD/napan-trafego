import puppeteer from 'puppeteer';
import { exec } from 'child_process';

const server = exec('npm run dev');
setTimeout(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' }).catch(e => console.error('GOTO ERROR:', e));
  await browser.close();
  server.kill();
  process.exit(0);
}, 3000);
