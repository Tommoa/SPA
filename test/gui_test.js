/*
npm install selenium-webdriver

Download the respective driver for your browser and add it to your system PATH
https://www.selenium.dev/documentation/en/webdriver/driver_requirements/#quick-reference
*/
const { actions, Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function open_page(driver, page) {
	await driver.get(page).then(async function() {
		await driver.sleep(2000);
	});
}

async function test_configure_page(driver, url) {
	await driver.wait(until.elementLocated(By.xpath("//div[@id='base-url']//input"))).sendKeys(url, Key.ENTER);
	await driver.sleep(2000);
}

async function test_datastore_pages(driver) {
	//Click 'Refresh CSV Folder' button and wait for content
	await driver.wait(until.elementLocated(By.xpath("//div[@id='addcsv_btn']/button"))).click();
	await driver.wait(until.alertIsPresent()).then(async function() {
		await driver.sleep(1000);
		await driver.switchTo().alert().accept();
		await driver.sleep(1000);
		await driver.switchTo().alert().accept();
	});
	await driver.wait(until.elementLocated(By.xpath("//table")));
	await driver.sleep(2000);
}

//Test search pages
async function test_search_page(driver, search_type, search_string) {
	//Enter search string and from time
	await driver.wait(until.elementLocated(By.css(search_type))).sendKeys(search_string);
	await driver.findElement(By.xpath("//div[@id='from']//input")).sendKeys('01012010', Key.ENTER);

	//Click on profile card and wait for modal to load before closing
	await driver.wait(until.elementLocated(By.id('profile-container'))).click();
	await driver.wait(until.elementLocated(By.xpath("//div[@class='loader'][contains(@style, 'display: none')]")));
	await driver.sleep(2000).then(async function() {
		await driver.actions().sendKeys(Key.ESCAPE).perform();
	});

	//Check latest alerts loads
	try {
		await driver.wait(until.elementLocated(By.xpath("//div[@class='latest-alert']")), 4000);
	} catch (err) {
		console.log('Error: latest alerts not found, check that TIM is connected.');
	}
	await driver.sleep(1000);
}

//Test map page
async function test_map_page(driver) {
	//Wait for map to load
	try {
		await driver.wait(until.elementLocated(By.xpath("//div[@id='map']/div")), 4000);
	} catch (err) {
		console.log('Error: map not found, check that your API key is valid and TIM is connected.');
	}
	await driver.sleep(2000);
}

async function test_alert_page(driver) {
	//Check the alerts table loads
	try {
		await driver.wait(until.elementLocated(By.xpath("//div[@class='alerts-list']/table")), 4000);
	} catch (err) {
		console.log('Error: alerts not found, check that TIM is connected.');
	}
	await driver.sleep(2000);
}

async function test_dashboard_page(driver) {
	//Check that the payload from TIM is loaded
	let we = await driver.wait(
		until.elementLocated(By.xpath("//div[@class='daily-alert-count']/div[@class='content']"))).getText();
	if(we === '') {
		console.log('Error: dashboard not loaded, check that TIM is connected.');
	}
	await driver.sleep(2000);
}

async function main() {
	let driver = new Builder().forBrowser('chrome').build();
	let home_page = 'http://localhost:8000/en-GB/app/SPA/';
	let tim_url = 'http://127.0.0.1:5000/';

	let dashboard_page = 'Dashboard';
	let website_page = 'BlackList';
	let contacts_page = 'ContactList';
	let id_page = 'SearchByID';
	let mac_page = 'SearchByMAC';
	let map_page = 'Map';
	let alert_page = 'AlertList';
	let configure_page = 'ConfigureAPI';

	await open_page(driver, home_page);

	//Test Configure API
	await open_page(driver, home_page + configure_page);
	await test_configure_page(driver, tim_url);

	//Test Contacts
	await open_page(driver, home_page+contacts_page);
	await test_datastore_pages(driver);

	//Test Websites
	await open_page(driver, home_page+website_page);
	await test_datastore_pages(driver);

	//Test searchByID
	await open_page(driver, home_page+id_page);
	await test_search_page(driver, '#studentid input', '21969062');

	//Test searchByMACAddress
	await open_page(driver, home_page+mac_page);
	await test_search_page(driver, '#MACaddress input', '24:92:0e:c2:62:ae');

	//Test Map
	await open_page(driver, home_page+map_page);
	await test_map_page(driver);

	//Test Alerts
	await open_page(driver, home_page+alert_page);
	await test_alert_page(driver);

	//Test Dashboard
	await open_page(driver, home_page + dashboard_page);
	await test_dashboard_page(driver);

	console.log('Tests done');
	//STOP CLOSING MY BROWSER
	await setTimeout(function() {
		console.log('Closing browser');
	}, 5000);
}

main();
