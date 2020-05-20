/*
npm install selenium-webdriver

Download the respective driver for your browser and add it to your system PATH
https://www.selenium.dev/documentation/en/webdriver/driver_requirements/#quick-reference
*/
const { actions, Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function open_page(driver, page) {
    driver.get(page);
};


//Test search pages
async function test_search(driver, search_type, search_string) {
	//Enter search string and from time
	await driver.wait(until.elementLocated(By.css(search_type))).sendKeys(search_string);
	await driver.findElement(By.xpath("//div[@id='from']//input")).sendKeys('01012010', Key.ENTER);

	//Click on profile card and wait for modal to load before closing
	await driver.wait(until.elementLocated(By.id('profile-container'))).click();
	await driver.wait(until.elementLocated(By.xpath("//div[@class='loader'][contains(@style, 'display: none')]")));
	await driver.sleep(2000).then(async function () {
		await driver.actions().sendKeys(Key.ESCAPE).perform();
	});
	await driver.sleep(1000);
}

async function main() {
	let driver = new Builder().forBrowser('chrome').build();
	let home_page = 'http://localhost:8000/en-GB/app/SPA';
	let id_page = '/SearchByID';
	let mac_page = '/SearchByMAC';

	await open_page(driver, home_page);

	//Test searchByID
	await open_page(driver, home_page+id_page);
	await test_search(driver, '#studentid input', '21969062');

	//Test searchByMACAddress
	await open_page(driver, home_page+mac_page);
	await test_search(driver, '#MACaddress input', '24:92:0e:c2:62:ae');

	//STOP CLOSING MY BROWSER
	await setTimeout(function () {
		console.log('closing browser');
	}, 100000);
}

main();
