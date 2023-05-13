async function testFormWithPuppeteer() {
	const puppeteer = require("puppeteer");

	// Launch a new browser instance
	const browser = await puppeteer.launch();

	// Create a new page in the browser
	const page = await browser.newPage();

	// Navigate to the form page
	await page.goto("https://example.com/form");

	// Fill out the form fields
	await page.type("#name", "John Doe");
	await page.type("#email", "johndoe@example.com");
	await page.type("#password", "password123");
	await page.type("#confirm_password", "password123");
	await page.type("#phone", "1234567890");
	await page.type("#address", "123 Main St");

	// Submit the form
	await page.click("button[type=submit]");

	// Wait for the form submission to complete
	await page.waitForNavigation();

	// Check that the form submission was successful
	const successMessage = await page.$eval("body", (el) => el.innerText);
	if (successMessage !== "Form submitted successfully.") {
		throw new Error("Form submission failed!");
	}

	// Close the browser
	await browser.close();
}

testFormWithPuppeteer();
